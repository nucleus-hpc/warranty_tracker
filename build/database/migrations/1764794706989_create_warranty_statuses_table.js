import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'warranty_statuses';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('slug', 50).notNullable();
            table.string('label', 50).notNullable();
            table.string('description', 255).nullable();
            table.string('color_code', 7).defaultTo('#808080');
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1764794706989_create_warranty_statuses_table.js.map