import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'ticket_timeline';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id');
            table.bigInteger('ticket_id').unsigned().references('id').inTable('warranty_tickets').onDelete('CASCADE');
            table.integer('from_status_id').unsigned().nullable().references('id').inTable('warranty_statuses');
            table.integer('to_status_id').unsigned().notNullable().references('id').inTable('warranty_statuses');
            table.text('technician_notes').nullable();
            table.text('customer_notes').nullable();
            table.decimal('cost_estimate', 10, 2).defaultTo(0.00);
            table.string('evidence_url', 255).nullable();
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1764794787735_create_ticket_timelines_table.js.map