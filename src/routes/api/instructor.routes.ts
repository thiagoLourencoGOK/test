import express from 'express'
import { authenticate } from 'passport'

import { DeleteInstructorController } from '@/controllers/api/instructor/delete.controller'
import { ListAllInstructorsController } from '@/controllers/api/instructor/list_all.controller'
import { ListOneInstructorController } from '@/controllers/api/instructor/list_one.controller'
import { RegisterInstructorController } from '@/controllers/api/instructor/register.controller'
import { UpdateInstructorController } from '@/controllers/api/instructor/update.controller'

const router = express.Router()

router.get('/', authenticate(['jwt', 'anonymous'], { session: false }), ListAllInstructorsController)
router.get('/:id', ListOneInstructorController)
router.post('/', authenticate(['jwt', 'anonymous'], { session: false }), RegisterInstructorController)
router.patch('/:id', authenticate(['jwt'], { session: false }), UpdateInstructorController)
router.delete('/:id', authenticate(['jwt'], { session: false }), DeleteInstructorController)

export default router
