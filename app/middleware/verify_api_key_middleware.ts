import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

export default class VerifyApiKeyMiddleware {
  public async handle(ctx: HttpContext, next: NextFn) {
    // 1. Obtener el header esperado (usualmente x-api-key)
    const clientApiKey = ctx.request.header('x-api-key')

    // 2. Obtener la llave maestra del entorno
    const serverApiKey = env.get('API_SECRET_KEY')

    // 3. Validación estricta
    if (!clientApiKey || clientApiKey !== serverApiKey) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Acceso denegado: API Key inválida o ausente.'
      })
    }

    // 4. Si todo está bien, pasar al siguiente eslabón (el Controlador)
    await next()
  }
}