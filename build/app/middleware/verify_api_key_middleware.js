import env from '#start/env';
export default class VerifyApiKeyMiddleware {
    async handle(ctx, next) {
        const clientApiKey = ctx.request.header('x-api-key');
        const serverApiKey = env.get('API_SECRET_KEY');
        if (!clientApiKey || clientApiKey !== serverApiKey) {
            return ctx.response.unauthorized({
                success: false,
                message: 'Acceso denegado: API Key inválida o ausente.'
            });
        }
        await next();
    }
}
//# sourceMappingURL=verify_api_key_middleware.js.map