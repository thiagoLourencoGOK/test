import { InstructorModel } from '@/models/instructor.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function DeleteInstructorController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const instructor = await InstructorModel.findOne({ _id: req.params.id })
    if (!instructor) throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found')
    await instructor.delete()
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
