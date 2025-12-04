import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import WarrantyService from '#services/warranty_service'
import { getStatusValidator } from '#validators/warranty_validator'

@inject()
export default class WarrantyTrackingsController {
    constructor(protected service: WarrantyService) { }

    /**
     * GET /api/tracking/:code
     */
    public async show({ params, response }: HttpContext) {
        const payload = await getStatusValidator.validate({
            params: params
        })

        try {
            const data = await this.service.getTrackingDetails(payload.params.code)

            return response.ok({
                success: true,
                data: data,
                message: 'Tracking recuperado exitosamente.'
            })

        } catch (error: any) {
            // Loguear siempre en consola del servidor (útil para revisar logs de producción vía SSH/Docker)
            console.error('[WarrantyTrackingsController] Error:', error)

            // Error de negocio controlado
            if (error.code === 'E_TICKET_NOT_FOUND') {
                return response.notFound({
                    success: false,
                    message: error.message
                })
            }

            // Error 500: Lógica condicional para debug
            const isDev = process.env.NODE_ENV === 'development'

            return response.internalServerError({
                success: false,
                message: 'Ocurrió un error al procesar su solicitud.',
                // Spread condicional: Si es dev, agrega el objeto debug, si no, no agrega nada.
                ...(isDev ? {
                    debug: {
                        message: error.message,
                        code: error.code,
                        file: error.fileName, // A veces útil si el error viene de file system
                        line: error.lineNumber,
                        stack: error.stack
                    }
                } : {})
            })
        }
    }
}