var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from '@adonisjs/core';
import WarrantyRepository from '#repositories/warranty_repository';
import { Exception } from '@adonisjs/core/exceptions';
let WarrantyService = class WarrantyService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getTrackingDetails(code) {
        const ticket = await this.repository.findByTrackingCode(code);
        if (!ticket) {
            throw new Exception('El número de ticket no existe o es incorrecto.', {
                code: 'E_TICKET_NOT_FOUND',
                status: 404,
            });
        }
        return ticket;
    }
};
WarrantyService = __decorate([
    inject(),
    __metadata("design:paramtypes", [WarrantyRepository])
], WarrantyService);
export default WarrantyService;
//# sourceMappingURL=warranty_service.js.map