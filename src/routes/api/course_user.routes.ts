import express from 'express'
import { authenticate } from 'passport'

import { RegisterUserAndCourseController } from '@/controllers/api/course_user/register.controller'
import { CheckUserSubscriptionController } from '@/controllers/api/course_user/check_subscription.controller'
import { UpdateTimeCourseTimeController } from '@/controllers/api/course_user/update_time.controller'
import { ListAllCourseUsersController } from '@/controllers/api/course_user/list_all.controller'
import { ListOneCourseUserController } from '@/controllers/api/course_user/list_one.controler'

const router = express.Router()

router.get('/', authenticate(['jwt'], { session: false }), ListAllCourseUsersController)
router.post('/:course_id', authenticate(['jwt'], { session: false }), RegisterUserAndCourseController)
router.get('/:course_id/check', authenticate(['jwt'], { session: false }), CheckUserSubscriptionController)
router.get('/:course_id', authenticate(['jwt'], { session: false }), ListOneCourseUserController)
router.patch('/:course_id', authenticate(['jwt'], { session: false }), UpdateTimeCourseTimeController)

export default router
