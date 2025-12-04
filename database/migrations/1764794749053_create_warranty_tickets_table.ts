import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'warranty_tickets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('tracking_code', 20).notNullable().unique().index() // Indexado para búsquedas rápidas
      table.string('product_sku', 50).notNullable()
      table.string('product_name', 100).notNullable()
      table.string('owner_name', 150).notNullable()
      table.string('owner_dpi', 20).notNullable()
      table.string('establishment_name', 100).notNullable()

      // Coordenadas
      table.decimal('geo_lat', 10, 8).nullable()
      table.decimal('geo_lon', 11, 8).nullable()

      table.text('problem_desc').notNullable()

      // Foreign Key al estado actual
      table.integer('current_status_id').unsigned().references('id').inTable('warranty_statuses')

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}