import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import userCourse from '@/services/user_course/subscribe_user'
import checkUserCourse from '@/services/user_course/check_user_subscribed'

interface IUser {
  _id?: string
}

export async function RegisterUserAndCourseController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const user: IUser = req.user
    const course_id = req.params.course_id

    if (!user || !course_id) {
      return res.status(403).json({ success: false, message: 'Validation error' })
    }

    const alreadySubscribed = await checkUserCourse({ user_id: user._id, course_id })

    if (alreadySubscribed) {
      return res.status(403).json({ success: false, message: 'Usuario já inscrito nesse curso' })
    }

    const course = await userCourse({ user_id: user._id, course_id })

    if (!course) {
      return res.status(400).json({ success: false, message: 'Erro ao se inscrever no curso' })
    }

    return res.json(course)
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
