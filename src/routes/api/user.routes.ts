import express from 'express'
import { authenticate } from 'passport'

import { DeleteUserController } from '@/controllers/api/user/delete.controller'
import { ListAllUsersController } from '@/controllers/api/user/list_all.controller'
import { ListOneUserController } from '@/controllers/api/user/list_one.controller'
import { RegisterUserController } from '@/controllers/api/user/register.controller'
import { UpdateUserController } from '@/controllers/api/user/update.controller'
const router = express.Router()

router.get('/', authenticate(['jwt', 'anonymous'], { session: false }), ListAllUsersController)
router.get('/:id', ListOneUserController)
router.post('/', authenticate(['jwt', 'anonymous'], { session: false }), RegisterUserController)
router.patch('/:id', authenticate(['jwt'], { session: false }), UpdateUserController)
router.delete('/:id', authenticate(['jwt'], { session: false }), DeleteUserController)

export default router
