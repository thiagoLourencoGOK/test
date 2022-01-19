import { InstructorModel } from '@/models/instructor.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function UpdateInstructorController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    let instructor = await InstructorModel.findOne({ _id: req.params.id })

    if (!instructor) res.status(httpStatus.NOT_FOUND).send({ message: 'Instructor not found' })

    instructor = await Object.assign(instructor, req.body)

    await instructor.save()

    res.json(instructor)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
