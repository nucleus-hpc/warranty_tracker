import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import WarrantyTicket from '#models/warranty_ticket'
import TicketTimeline from '#models/ticket_timeline'

export default class extends BaseSeeder {

  // Array de URLs de evidencias fake (Unsplash)
  private evidencePool = [
    'https://images.unsplash.com/photo-1570533519183-585473489858?auto=format&fit=crop&q=80&w=600', // Oxidada/Vieja
    'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=600', // Rota
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600', // Sucia
    'https://images.unsplash.com/photo-1563823223055-635582313318?auto=format&fit=crop&q=80&w=600', // Quemada
    'https://images.unsplash.com/photo-1612450630327-1473950b91df?auto=format&fit=crop&q=80&w=600'  // Derretida
  ]

  public async run() {
    // Limpieza inicial
    await TicketTimeline.query().delete()
    await WarrantyTicket.query().delete()

    // Ejecución de lotes
    await this.seedState1_Received()
    await this.seedState2_Transit()
    await this.seedState3_Diagnosing()
    await this.seedState4_PendingApproval()
    await this.seedState5_Repairing()
    await this.seedState6_Ready()
    await this.seedState7_Rejected()
    await this.seedState8_Closed()
  }

  /**
   * HELPER: Genera Ticket + Historial Retroactivo
   */
  private async createTicketWithHistory(
    data: Partial<WarrantyTicket>,
    targetStatusId: number,
    daysAgoStart: number,
    specialNotes: any = {}
  ) {
    // 1. Crear el Ticket
    // Nota: En Lucid moderno, .create espera un objeto plano que coincida con el modelo
    const ticket = await WarrantyTicket.create({
      trackingCode: data.trackingCode,
      productSku: data.productSku,
      productName: data.productName,
      ownerName: data.ownerName,
      ownerDpi: data.ownerDpi,
      establishmentName: data.establishmentName,
      geoLat: data.geoLat,
      geoLon: data.geoLon,
      problemDesc: data.problemDesc,
      currentStatusId: targetStatusId,
      createdAt: DateTime.now().minus({ days: daysAgoStart }),
      updatedAt: DateTime.now()
    })

    // 2. Lógica del Timeline
    let currentDayOffset = daysAgoStart
    const flow = [1, 2, 3, 5, 6, 8] // Flujo feliz estándar

    // Calcular pasos según el destino
    const steps: number[] = []

    if (targetStatusId === 7) {
      // Flujo rechazo
      steps.push(1, 2, 3)
      if (specialNotes.wasInApproval) steps.push(4)
      steps.push(7)
    } else if (targetStatusId === 4) {
      steps.push(1, 2, 3, 4)
    } else {
      // Flujo normal
      for (const s of flow) {
        if (s <= targetStatusId) steps.push(s)
      }
    }

    let previousStatusId: number | null = null

    for (const stepStatusId of steps) {
      currentDayOffset = Math.max(0, currentDayOffset - 2)

      const isLastStep = stepStatusId === targetStatusId

      let techNotes = null
      let custNotes = null
      let cost = 0
      let evidence = null

      if (isLastStep) {
        techNotes = specialNotes.technicianNotes || null
        custNotes = specialNotes.customerNotes || null
        cost = specialNotes.costEstimate || 0
        evidence = specialNotes.evidenceUrl || null
      } else {
        // Notas de relleno para el historial
        if (stepStatusId === 1) custNotes = 'Recepción en tienda.'
        if (stepStatusId === 2) custNotes = 'En ruta a taller central.'
        if (stepStatusId === 3) custNotes = 'Iniciando diagnóstico.'
        if (stepStatusId === 4) { custNotes = 'Presupuesto generado.'; cost = 150; }
        if (stepStatusId === 5) techNotes = 'Reparación iniciada.'
      }

      await TicketTimeline.create({
        ticketId: ticket.id,
        fromStatusId: previousStatusId,
        toStatusId: stepStatusId,
        technicianNotes: techNotes,
        customerNotes: custNotes,
        costEstimate: cost,
        evidenceUrl: evidence,
        createdAt: DateTime.now().minus({ days: currentDayOffset })
      })

      previousStatusId = stepStatusId
    }
  }

  // --- DEFINICIÓN DE CASOS (Igual que antes, solo estructura de llamada) ---

  private async seedState1_Received() {
    const batch = [
      { sku: 'TAL-1/2A', name: 'Taladro 1/2', prob: 'No gira mandril', user: 'Mario L.' },
      { sku: 'ESM-4', name: 'Esmeril 4"', prob: 'Vibra mucho', user: 'Ana R.' },
      { sku: 'GEN-X', name: 'Generador', prob: 'No arranca', user: 'Construcciones SA' },
      { sku: 'COM-AIR', name: 'Compresor', prob: 'Fuga de aire', user: 'Taller 1' },
      { sku: 'CAL-PRO', name: 'Caladora', prob: 'Switch trabado', user: 'Luis V.' },
    ]
    for (const [i, item] of batch.entries()) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-NEW-00${i + 1}`, productSku: item.sku, productName: item.name,
        ownerName: item.name, ownerDpi: `1000 ${i}000 0101`, establishmentName: 'Ferretería Central',
        problemDesc: item.prob, geoLat: 14.6 + (i * 0.01), geoLon: -90.5 + (i * 0.01)
      }, 1, 0)
    }
  }

  private async seedState2_Transit() {
    const batch = [
      { sku: 'HIDRO-20', name: 'Hidrolavadora', prob: 'Sin presión', user: 'Pedro P.' },
      { sku: 'SIER-7', name: 'Sierra Circular', prob: 'Zapata doblada', user: 'Carpintería J' },
      { sku: 'CAL-PRO', name: 'Caladora', prob: 'Cable cortado', user: 'Luis V.' },
      { sku: 'MOT-3', name: 'Motosierra', prob: 'No enciende', user: 'Finca La Paz' },
      { sku: 'ASP-12', name: 'Aspiradora', prob: 'Olor a quemado', user: 'Carwash Z' },
    ]
    for (const [i, item] of batch.entries()) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-TRA-00${i + 1}`, productSku: item.sku, productName: item.name,
        ownerName: item.name, ownerDpi: `2000 ${i}000 0101`, establishmentName: 'Agencias Way',
        problemDesc: item.prob, geoLat: 14.5 + (i * 0.01), geoLon: -90.4 + (i * 0.01)
      }, 2, 2)
    }
  }

  private async seedState3_Diagnosing() {
    const batch = [
      { sku: 'COMP-50', name: 'Compresor 50L', prob: 'No carga', user: 'Taller Rayo' },
      { sku: 'SOL-INV', name: 'Soldadora Inverter', prob: 'Se protege sola', user: 'Herrería M' },
      { sku: 'ROT-IND', name: 'Rotomartillo', prob: 'Tira grasa', user: 'Cons. X' },
      { sku: 'PUL-7', name: 'Pulidora 7"', prob: 'Ruido en caja', user: 'Metalurgica A' },
      { sku: 'TAL-BAN', name: 'Taladro Banco', prob: 'Faja rota', user: 'Escuela Téc' },
    ]
    for (const [i, item] of batch.entries()) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-DIA-00${i + 1}`, productSku: item.sku, productName: item.name,
        ownerName: item.name, ownerDpi: `3000 ${i}000 0101`, establishmentName: 'Novex',
        problemDesc: item.prob, geoLat: 14.7 + (i * 0.01), geoLon: -90.6 + (i * 0.01)
      }, 3, 4)
    }
  }

  private async seedState4_PendingApproval() {
    const cases = [
      { sku: 'BOM-1HP', name: 'Bomba Agua', prob: 'Se trabó', note: 'Se encontró PEZ en impulsor. Mal uso.', user: 'Carlos Pescador', cost: 450.50, img: 0 },
      { sku: 'NIV-LAS', name: 'Nivel Laser', prob: 'No da linea', note: 'Lente roto por caída. Impacto severo.', user: 'Arq. Morales', cost: 800.00, img: 1 },
      { sku: 'DEMO-65', name: 'Demoledor', prob: 'Sin fuerza', note: 'Mantenimiento preventivo completo requerido.', user: 'Caminos SA', cost: 150.00, img: 2 },
      { sku: 'GEN-5K', name: 'Generador 5kW', prob: 'No regula', note: 'Tarjeta AVR quemada por retorno de energía.', user: 'Evento Pro', cost: 1200.00, img: 3 },
      { sku: 'MOT-DES', name: 'Motoguadaña', prob: 'No acelera', note: 'Carburador obstruido por combustible viejo.', user: 'Jardinero Juan', cost: 250.00, img: 4 },
    ]
    for (const [i, item] of cases.entries()) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-APP-00${i + 1}`, productSku: item.sku, productName: item.name,
        ownerName: item.name, ownerDpi: `4000 ${i}000 0101`, establishmentName: 'El Martillo',
        problemDesc: item.prob, geoLat: 14.8 + (i * 0.01), geoLon: -90.3 + (i * 0.01)
      }, 4, 7, {
        technicianNotes: item.note,
        customerNotes: 'Requiere aprobación de costo por daño no cubierto o mtto.',
        costEstimate: item.cost,
        evidenceUrl: this.evidencePool[item.img]
      })
    }
  }

  private async seedState5_Repairing() {
    const batch = [
      { sku: 'TAL-20V', name: 'Taladro 20V', prob: 'Cargador malo', user: 'Sonia K' },
      { sku: 'POD-GAS', name: 'Podadora', prob: 'No arranca', user: 'Jardines SA' },
      { sku: 'ASP-IND', name: 'Aspiradora', prob: 'Olor quemado', user: 'Carwash R' },
      { sku: 'COM-POR', name: 'Compresor Portatil', prob: 'Válvula fuga', user: 'Sr. X' },
      { sku: 'SIE-CAL', name: 'Sierra Caladora', prob: 'Base floja', user: 'Muebles Y' },
    ]
    for (const [i, item] of batch.entries()) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-FIX-00${i + 1}`, productSku: item.sku, productName: item.name,
        ownerName: item.name, ownerDpi: `5000 ${i}000 0101`, establishmentName: 'Cemaco',
        problemDesc: item.prob, geoLat: 14.9, geoLon: -90.5
      }, 5, 10, { technicianNotes: 'En espera de repuestos.' })
    }
  }

  private async seedState6_Ready() {
    const batch = [
      { sku: 'LIJ-ORB', name: 'Lijadora', prob: 'Base rota', user: 'Muebles Finos' },
      { sku: 'COM-12V', name: 'Compresor Auto', prob: 'No infla', user: 'Juan V' },
      { sku: 'MOT-SIE', name: 'Motosierra', prob: 'Cadena traba', user: 'Finca R' },
      { sku: 'GEN-INV', name: 'Generador Inv', prob: 'Ruido raro', user: 'Foodtruck' },
      { sku: 'TAL-ROT', name: 'Taladro Rot', prob: 'Gatillo fallo', user: 'Albañil P' },
    ]
    for (const [i, item] of batch.entries()) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-RDY-00${i + 1}`, productSku: item.sku, productName: item.name,
        ownerName: item.name, ownerDpi: `6000 ${i}000 0101`, establishmentName: 'Novex',
        problemDesc: item.prob, geoLat: 15.0, geoLon: -90.2
      }, 6, 15, { customerNotes: 'Listo para entrega en sucursal.' })
    }
  }

  private async seedState7_Rejected() {
    const cases = [
      { sku: 'TAL-BAN', name: 'Taladro Banco', prob: 'Motor quemado', note: 'Cliente no aceptó costo Q1200.', reason: 'Presupuesto rechazado', img: 3 },
      { sku: 'COM-OLD', name: 'Compresor 2005', prob: 'Explotó', note: 'Equipo obsoleto. Sin repuestos.', reason: 'Irreparable', img: 0 },
      { sku: 'PUL-7', name: 'Pulidora', prob: 'Derretida', note: 'Evidencia de fuego directo.', reason: 'Mal uso extremo', img: 4 },
      { sku: 'HID-IND', name: 'Hidrolavadora', prob: 'Carcasa rota', note: 'Pasada por encima por vehículo.', reason: 'Daño físico', img: 1 },
      { sku: 'BAT-20V', name: 'Batería 20V', prob: 'Hinchada', note: 'Modificada internamente.', reason: 'Violación sellos', img: 2 },
    ]
    for (const [i, item] of cases.entries()) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-REJ-00${i + 1}`, productSku: item.sku, productName: item.name,
        ownerName: item.name || 'Cliente', ownerDpi: `7000 ${i}000 0101`, establishmentName: 'El Martillo',
        problemDesc: item.prob, geoLat: 14.5, geoLon: -90.5
      }, 7, 20, {
        technicianNotes: item.note,
        customerNotes: item.reason,
        wasInApproval: true,
        evidenceUrl: this.evidencePool[item.img]
      })
    }
  }

  private async seedState8_Closed() {
    for (let i = 0; i < 5; i++) {
      await this.createTicketWithHistory({
        trackingCode: `TRU-END-00${i + 1}`, productSku: 'VAR-PROD', productName: 'Herramienta Variada',
        ownerName: 'Cliente Feliz', ownerDpi: `8000 ${i}000 0101`, establishmentName: 'Agencias Way',
        problemDesc: 'Mantenimiento General', geoLat: 14.6, geoLon: -90.5
      }, 8, 30, { customerNotes: 'Entregado al cliente.' })
    }
  }
}