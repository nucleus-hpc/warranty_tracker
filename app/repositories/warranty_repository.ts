import WarrantyTicket from '#models/warranty_ticket'

export default class WarrantyRepository {
    /**
     * Busca un ticket por su código de rastreo.
     * Incluye: Estado actual + Historial completo (Timeline) ordenado cronológicamente.
     */
    public async findByTrackingCode(code: string) {
        return await WarrantyTicket.query()
            .where('tracking_code', code)
            // Carga el estado actual (relación simple)
            .preload('currentStatus')
            // Carga la línea de tiempo (relación hasMany)
            .preload('timeline', (query) => {
                // Dentro del timeline, cargamos el nombre del estado de cada paso
                query.preload('status')
                // ORDENAMIENTO CRUCIAL: Asegura que vengan paso 1, 2, 3...
                query.orderBy('createdAt', 'asc')
            })
            .first()
    }
}