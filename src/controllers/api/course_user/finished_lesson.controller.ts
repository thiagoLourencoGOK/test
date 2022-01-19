import { UserModel } from '@/models/user.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

interface IUser {
  _id?: string
}

export async function UpdateTimeCourseTimeController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const user: IUser = req.user
    const course_id = req.params.course_id

    if (!course_id) {
      return res.status(403).send({ success: false, message: 'Validation error' })
    }

    await UserModel.findOneAndUpdate(
      {
        _id: user._id,
        courses: { $elemMatch: { course: { _id: course_id } } },
      },
      {
        $set: { 'courses.$.lessons_finished': true },
      },
    )

    return res.json({ success: true, message: 'Atualizado com sucesso' })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
