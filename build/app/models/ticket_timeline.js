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
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import WarrantyTicket from '#models/warranty_ticket';
import WarrantyStatus from '#models/warranty_status';
export default class TicketTimeline extends BaseModel {
    static table = 'ticket_timeline';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], TicketTimeline.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TicketTimeline.prototype, "ticketId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TicketTimeline.prototype, "fromStatusId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TicketTimeline.prototype, "toStatusId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TicketTimeline.prototype, "technicianNotes", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TicketTimeline.prototype, "customerNotes", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TicketTimeline.prototype, "costEstimate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TicketTimeline.prototype, "evidenceUrl", void 0);
__decorate([
    belongsTo(() => WarrantyTicket, {
        foreignKey: 'ticketId',
    }),
    __metadata("design:type", Object)
], TicketTimeline.prototype, "ticket", void 0);
__decorate([
    belongsTo(() => WarrantyStatus, {
        foreignKey: 'toStatusId',
    }),
    __metadata("design:type", Object)
], TicketTimeline.prototype, "status", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], TicketTimeline.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], TicketTimeline.prototype, "updatedAt", void 0);
//# sourceMappingURL=ticket_timeline.js.map