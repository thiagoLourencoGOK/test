import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import { CourseModel } from '@/models/courses.model'

export async function LessonUpdateController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { id } = req.params
    const lesson = req.body

    if (Object.keys(lesson).length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Validation error' })
    }

    const course = await CourseModel.findOneAndUpdate({ _id: id }, { $push: { lessons: lesson } })

    return res.json({ success: true, data: course })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
