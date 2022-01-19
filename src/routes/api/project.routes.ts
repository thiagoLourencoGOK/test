import express from 'express'
import { authenticate } from 'passport'

import { DeleteProjectController } from '@/controllers/api/project/delete.controller'
import { ListAllProjectsController } from '@/controllers/api/project/list_all.controller'
import { ListOneProjectController } from '@/controllers/api/project/list_one.controller'
import { RegisterProjectController } from '@/controllers/api/project/register.controller'
import { UpdateProjectController } from '@/controllers/api/project/update.controller'

const router = express.Router()

router.get('/', authenticate(['jwt'], { session: false }), ListAllProjectsController)
router.get('/:id', authenticate(['jwt'], { session: false }), ListOneProjectController)
router.post('/', authenticate(['jwt'], { session: false }), RegisterProjectController)
router.patch('/:id', authenticate(['jwt'], { session: false }), UpdateProjectController)
router.delete('/:id', authenticate(['jwt'], { session: false }), DeleteProjectController)

export default router
