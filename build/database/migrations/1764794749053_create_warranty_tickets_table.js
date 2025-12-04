import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'warranty_tickets';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id');
            table.string('tracking_code', 20).notNullable().unique().index();
            table.string('product_sku', 50).notNullable();
            table.string('product_name', 100).notNullable();
            table.string('owner_name', 150).notNullable();
            table.string('owner_dpi', 20).notNullable();
            table.string('establishment_name', 100).notNullable();
            table.decimal('geo_lat', 10, 8).nullable();
            table.decimal('geo_lon', 11, 8).nullable();
            table.text('problem_desc').notNullable();
            table.integer('current_status_id').unsigned().references('id').inTable('warranty_statuses');
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1764794749053_create_warranty_tickets_table.js.map