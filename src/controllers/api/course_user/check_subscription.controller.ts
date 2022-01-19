import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import checkUserCourse from '@/services/user_course/check_user_subscribed'

interface IUser {
  _id?: string
}

export async function CheckUserSubscriptionController(
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

    return res.json({ success: true, alreadySubscribed })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
