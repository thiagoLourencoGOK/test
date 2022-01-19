import { UserModel } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function DeleteUserController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    await user.delete()
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
