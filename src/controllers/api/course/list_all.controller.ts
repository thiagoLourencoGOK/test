import logger from '@/config/logger'
import { CourseModel } from '@/models/courses.model'

import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListAllCoursesController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.first_name)

    const populate = []

    const withTags = req.query.tags || false
    const withInstructors = req.query.instructors || false

    if (withTags && withTags === 'true') {
      populate.push('tags')
    }

    if (withInstructors && withInstructors === 'true') {
      populate.push('instructors')
    }

    const course = await CourseModel.find().populate(populate)

    res.json(course)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
