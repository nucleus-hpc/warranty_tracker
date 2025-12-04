import vine from '@vinejs/vine'

/**
 * Validador para obtener el status
 * Validamos que el trackingCode sea una cadena válida
 */
export const getStatusValidator = vine.compile(
    vine.object({
        params: vine.object({
            code: vine.string().trim().minLength(5).maxLength(20)
        })
    })
)