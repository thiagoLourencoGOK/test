import logger from '@/config/logger'
import { InstructorModel } from '@/models/instructor.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListAllInstructorsController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.first_name)

    const instructor = await InstructorModel.find()

    res.json(instructor)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
