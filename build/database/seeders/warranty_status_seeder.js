import { BaseSeeder } from '@adonisjs/lucid/seeders';
import WarrantyStatus from '#models/warranty_status';
export default class extends BaseSeeder {
    async run() {
        await WarrantyStatus.updateOrCreateMany('slug', [
            { slug: 'received', label: 'Ingresado', description: 'Equipo recibido en sucursal.', colorCode: '#3498db', id: 1 },
            { slug: 'in_transit', label: 'En Tránsito', description: 'Viajando a taller central.', colorCode: '#f1c40f', id: 2 },
            { slug: 'diagnosing', label: 'En Diagnóstico', description: 'Evaluación técnica en proceso.', colorCode: '#e67e22', id: 3 },
            { slug: 'pending_approval', label: 'Pendiente Aprobación', description: 'Requiere autorización de costo/garantía.', colorCode: '#e74c3c', id: 4 },
            { slug: 'repairing', label: 'En Reparación', description: 'Proceso de reparación activo.', colorCode: '#9b59b6', id: 5 },
            { slug: 'ready_for_pickup', label: 'Listo para Entrega', description: 'Equipo finalizado esperando retiro.', colorCode: '#2ecc71', id: 6 },
            { slug: 'rejected', label: 'Rechazado', description: 'Garantía no procede o rechazada.', colorCode: '#95a5a6', id: 7 },
            { slug: 'closed', label: 'Entregado', description: 'Caso cerrado.', colorCode: '#34495e', id: 8 },
        ]);
    }
}
//# sourceMappingURL=warranty_status_seeder.js.map