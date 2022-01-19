import { InstructorModel } from '@/models/instructor.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function RegisterInstructorController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const data = req.body

    const instructor = new InstructorModel(data)

    await instructor.save()

    res.json(instructor)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
