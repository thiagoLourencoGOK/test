import logger from '@/config/logger'
import { ProjectModel } from '@/models/projects.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListOneProjectController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.first_name)

    const project = await ProjectModel.findOne({ _id: req.params.id })

    if (!project) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found')

    res.json(project)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
