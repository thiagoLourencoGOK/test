import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import { UserModel } from '@/models/user.model'
import mongoose from 'mongoose'

interface IUser {
  _id?: string
}

export async function ListOneCourseUserController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const user: IUser = req.user
    const course_id = req.params.course_id

    const populate = []

    const withTags = req.query.tags || false
    const withCourse = req.query.course || false
    const withInstructors = req.query.instructors || false

    if (withCourse && withCourse === 'true') {
      populate.push('courses.course')
    }

    if (withTags && withCourse && withCourse === 'true' && withTags === 'true') {
      populate.push('courses.tags')
    }

    if (withInstructors && withCourse && withCourse === 'true' && withInstructors === 'true') {
      populate.push('courses.course.instructors')
    }

    const userData = await UserModel.findById(user._id).populate(populate)

    const course = userData.courses.find((course_user) =>
      new mongoose.Types.ObjectId(course_id).equals(course_user.course._id),
    )

    return res.json({ success: true, data: course })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
