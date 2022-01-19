import logger from '@/config/logger'
import { UserModel } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListOneUserController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.name)

    const user = await UserModel.findOne({ _id: req.params.id }).populate('courses.course')


    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found')

    res.json(user)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
