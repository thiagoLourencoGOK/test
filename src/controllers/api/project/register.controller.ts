import { ProjectModel } from '@/models/projects.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function RegisterProjectController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const data = req.body

    const project = new ProjectModel(data)

    await project.save()

    res.json(project)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
