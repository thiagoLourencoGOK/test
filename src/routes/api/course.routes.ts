import express from 'express'
import { authenticate } from 'passport'

import { ListAllCoursesController } from '@/controllers/api/course/list_all.controller'
import { ListOneCourseController } from '@/controllers/api/course/list_one.controller'
import { LessonUpdateController } from '@/controllers/api/course/lesson.controller'
import { WaitListCreateController } from '@/controllers/api/course/wait_list.controller'

const router = express.Router()

router.get('/', authenticate(['jwt', 'anonymous'], { session: false }), ListAllCoursesController)
router.get('/:id', ListOneCourseController)
router.put('/:id/lessons', authenticate(['jwt', 'anonymous'], { session: false }), LessonUpdateController)
router.post('/wait-list/:id', authenticate(['jwt', 'anonymous'], { session: false }), WaitListCreateController)

export default router
