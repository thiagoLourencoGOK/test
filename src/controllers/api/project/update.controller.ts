import { ProjectModel } from '@/models/projects.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function UpdateProjectController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    let project = await ProjectModel.findOne({ _id: req.params.id })

    if (!project) res.status(httpStatus.NOT_FOUND).send({ message: 'Project not found' })

    project = await Object.assign(project, req.body)

    await project.save()

    res.json(project)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
