import logger from '@/config/logger'
import { InstructorModel } from '@/models/instructor.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListOneInstructorController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.first_name)

    const instructor = await InstructorModel.findOne({ _id: req.params.id })

    if (!instructor) throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found')

    res.json(instructor)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
