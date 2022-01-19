import logger from '@/config/logger'
import { CourseModel } from '@/models/courses.model'
import ApiError from '@/utils/ApiError'
import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

export async function ListOneCourseController(req: Request, res: Response, next: NextFunction): Promise<Response> {
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

    const course = await CourseModel.findOne({ _id: req.params.id }).populate(populate)

    if (!course) throw new ApiError(httpStatus.NOT_FOUND, 'Course not found')

    res.json(course)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
