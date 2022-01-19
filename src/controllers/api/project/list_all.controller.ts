import logger from '@/config/logger'
import { ProjectModel } from '@/models/projects.model'

import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListAllProjectsController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.first_name)

    const projects = await ProjectModel.find()

    res.json(projects)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
