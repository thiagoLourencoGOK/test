import express from 'express'

import user from './user.routes'
import instructor from './instructor.routes'
import course from './course.routes'
import tag from './tag.routes'
import auth from './auth.routes'
import project from './project.routes'
import oauth from './social-auth.routes'
import forgot_password from './forgot_password.routes'
import course_user from './course_user.routes'

const router = express.Router()

router.use('/users', user)
router.use('/forgot-password', forgot_password)
router.use('/instructors', instructor)
router.use('/tags', tag)
router.use('/courses', course)
router.use('/projects', project)
router.use('/course-users', course_user)
router.use('/', oauth)

router.use(auth)

export default router
