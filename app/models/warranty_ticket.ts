import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
// OJO AQUÍ: usamos 'import type' y la ruta correcta
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import WarrantyStatus from '#models/warranty_status'
import TicketTimeline from '#models/ticket_timeline'

export default class WarrantyTicket extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare trackingCode: string

  @column()
  declare productSku: string

  @column()
  declare productName: string

  @column()
  declare ownerName: string

  @column()
  declare ownerDpi: string

  @column()
  declare establishmentName: string

  @column()
  declare geoLat: number | null

  @column()
  declare geoLon: number | null

  @column()
  declare problemDesc: string

  @column()
  declare currentStatusId: number

  // --- Relaciones ---

  @belongsTo(() => WarrantyStatus, {
    foreignKey: 'currentStatusId',
  })
  declare currentStatus: BelongsTo<typeof WarrantyStatus>

  @hasMany(() => TicketTimeline, {
    foreignKey: 'ticketId',
  })
  declare timeline: HasMany<typeof TicketTimeline>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}