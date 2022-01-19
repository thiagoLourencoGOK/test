import logger from '@/config/logger'
import { TagModel } from '@/models/tag.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListOneTagController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.first_name)

    const tag = await TagModel.findOne({ _id: req.params.id })

    if (!tag) throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found')

    res.json(tag)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
