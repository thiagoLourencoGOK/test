import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import { UserModel } from '@/models/user.model'

interface IUser {
  _id?: string
}

export async function ListAllCourseUsersController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const user: IUser = req.user

    const populate = []

    const withTags = req.query.tags || false
    const withCourse = req.query.course || false
    const withInstructors = req.query.instructors || false

    if (withCourse && withCourse === 'true') {
      populate.push('courses.course')
    }

    if (withTags && withCourse && withCourse === 'true' && withTags === 'true') {
      console.log('liberar tags')
      populate.push('courses.tags')
    }

    if (withInstructors && withCourse && withCourse === 'true' && withInstructors === 'true') {
      populate.push('courses.course.instructors')
    }
    const userData = await UserModel.findById(user._id).populate(populate)

    return res.json({ success: true, data: userData.courses })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
