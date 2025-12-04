/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Lazy loading del controlador (Best practice en Adonis 6)
const WarrantyTrackingsController = () => import('#controllers/warranty_trackings_controller')

router.group(() => {

  router.get('/tracking/:code', [WarrantyTrackingsController, 'show'])

})
  .prefix('api')
  .use(middleware.apiKey())
