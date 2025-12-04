import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import WarrantyTicket from '#models/warranty_ticket'
import WarrantyStatus from '#models/warranty_status'

export default class TicketTimeline extends BaseModel {

  public static table = 'ticket_timeline'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ticketId: number

  @column()
  declare fromStatusId: number | null

  @column()
  declare toStatusId: number

  @column()
  declare technicianNotes: string | null

  @column()
  declare customerNotes: string | null

  @column()
  declare costEstimate: number

  @column()
  declare evidenceUrl: string | null

  // --- Relaciones ---

  @belongsTo(() => WarrantyTicket, {
    foreignKey: 'ticketId',
  })
  declare ticket: BelongsTo<typeof WarrantyTicket>

  @belongsTo(() => WarrantyStatus, {
    foreignKey: 'toStatusId',
  })
  declare status: BelongsTo<typeof WarrantyStatus>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}