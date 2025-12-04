import WarrantyTicket from '#models/warranty_ticket';
export default class WarrantyRepository {
    async findByTrackingCode(code) {
        return await WarrantyTicket.query()
            .where('tracking_code', code)
            .preload('currentStatus')
            .preload('timeline', (query) => {
            query.preload('status');
            query.orderBy('createdAt', 'asc');
        })
            .first();
    }
}
//# sourceMappingURL=warranty_repository.js.map