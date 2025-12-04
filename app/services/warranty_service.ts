import { inject } from '@adonisjs/core'
import WarrantyRepository from '#repositories/warranty_repository'
import { Exception } from '@adonisjs/core/exceptions'

@inject()
export default class WarrantyService {
    constructor(protected repository: WarrantyRepository) { }

    /**
     * Obtiene el detalle completo del tracking.
     * Lanza error si no existe.
     */
    public async getTrackingDetails(code: string) {
        const ticket = await this.repository.findByTrackingCode(code)

        if (!ticket) {
            // Lanzamos una excepción controlada que Adonis puede capturar
            throw new Exception('El número de ticket no existe o es incorrecto.', {
                code: 'E_TICKET_NOT_FOUND',
                status: 404,
            })
        }

        return ticket
    }
}