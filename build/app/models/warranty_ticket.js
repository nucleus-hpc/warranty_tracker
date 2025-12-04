var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import WarrantyStatus from '#models/warranty_status';
import TicketTimeline from '#models/ticket_timeline';
export default class WarrantyTicket extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], WarrantyTicket.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WarrantyTicket.prototype, "trackingCode", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WarrantyTicket.prototype, "productSku", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WarrantyTicket.prototype, "productName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WarrantyTicket.prototype, "ownerName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WarrantyTicket.prototype, "ownerDpi", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WarrantyTicket.prototype, "establishmentName", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], WarrantyTicket.prototype, "geoLat", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], WarrantyTicket.prototype, "geoLon", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WarrantyTicket.prototype, "problemDesc", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], WarrantyTicket.prototype, "currentStatusId", void 0);
__decorate([
    belongsTo(() => WarrantyStatus, {
        foreignKey: 'currentStatusId',
    }),
    __metadata("design:type", Object)
], WarrantyTicket.prototype, "currentStatus", void 0);
__decorate([
    hasMany(() => TicketTimeline, {
        foreignKey: 'ticketId',
    }),
    __metadata("design:type", Object)
], WarrantyTicket.prototype, "timeline", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], WarrantyTicket.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], WarrantyTicket.prototype, "updatedAt", void 0);
//# sourceMappingURL=warranty_ticket.js.map