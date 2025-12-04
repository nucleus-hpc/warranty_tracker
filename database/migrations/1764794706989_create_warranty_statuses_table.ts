import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'warranty_statuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug', 50).notNullable()
      table.string('label', 50).notNullable()
      table.string('description', 255).nullable()
      table.string('color_code', 7).defaultTo('#808080')

      /**
       * timestamps() crea created_at y updated_at. 
       * El true activa el tipo TIMESTAMP en lugar de DATETIME
       */
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}