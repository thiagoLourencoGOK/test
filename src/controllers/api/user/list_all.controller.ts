import logger from '@/config/logger'
import { UserModel } from '@/models/user.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function ListAllUsersController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    logger.debug('%o', req.body.first_name)

    const user = await UserModel.find().populate('courses')

    res.json(user)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
