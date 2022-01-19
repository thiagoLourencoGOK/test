import { DeleteTagController } from '@/controllers/api/tag/delete.controller'
import { ListAllTagsController } from '@/controllers/api/tag/list_all.controller'
import { ListOneTagController } from '@/controllers/api/tag/list_one.controller'
import { RegisterTagController } from '@/controllers/api/tag/register.controller'
import { UpdateTagController } from '@/controllers/api/tag/update.controller'
import express from 'express'

const router = express.Router()

router.get('/', ListAllTagsController)
router.get('/:id', ListOneTagController)
router.post('/', RegisterTagController)
router.patch('/:id', UpdateTagController)
router.delete('/:id', DeleteTagController)

export default router
