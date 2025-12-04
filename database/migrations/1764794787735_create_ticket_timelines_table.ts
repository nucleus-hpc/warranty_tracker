import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ticket_timeline'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      // Relación con el Ticket (Cascade delete para limpiar si se borra el ticket)
      table.bigInteger('ticket_id').unsigned().references('id').inTable('warranty_tickets').onDelete('CASCADE')

      // Transición de estados
      table.integer('from_status_id').unsigned().nullable().references('id').inTable('warranty_statuses')
      table.integer('to_status_id').unsigned().notNullable().references('id').inTable('warranty_statuses')

      // Data extra
      table.text('technician_notes').nullable()
      table.text('customer_notes').nullable()
      table.decimal('cost_estimate', 10, 2).defaultTo(0.00)
      table.string('evidence_url', 255).nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}