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
import WarrantyService from '#services/warranty_service';
import { getStatusValidator } from '#validators/warranty_validator';
let WarrantyTrackingsController = class WarrantyTrackingsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async show({ params, response }) {
        const payload = await getStatusValidator.validate({
            params: params
        });
        try {
            const data = await this.service.getTrackingDetails(payload.params.code);
            return response.ok({
                success: true,
                data: data,
                message: 'Tracking recuperado exitosamente.'
            });
        }
        catch (error) {
            console.error('[WarrantyTrackingsController] Error:', error);
            if (error.code === 'E_TICKET_NOT_FOUND') {
                return response.notFound({
                    success: false,
                    message: error.message
                });
            }
            const isDev = process.env.NODE_ENV === 'development';
            return response.internalServerError({
                success: false,
                message: 'Ocurrió un error al procesar su solicitud.',
                ...(isDev ? {
                    debug: {
                        message: error.message,
                        code: error.code,
                        file: error.fileName,
                        line: error.lineNumber,
                        stack: error.stack
                    }
                } : {})
            });
        }
    }
};
WarrantyTrackingsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [WarrantyService])
], WarrantyTrackingsController);
export default WarrantyTrackingsController;
//# sourceMappingURL=warranty_trackings_controller.js.map