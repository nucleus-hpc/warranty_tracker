import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
const WarrantyTrackingsController = () => import('#controllers/warranty_trackings_controller');
router.group(() => {
    router.get('/tracking/:code', [WarrantyTrackingsController, 'show']);
})
    .prefix('api')
    .use(middleware.apiKey());
//# sourceMappingURL=routes.js.map