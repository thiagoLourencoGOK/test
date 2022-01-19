import { UserModel } from '@/models/user.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function UpdateUserController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    let user = await UserModel.findOne({ _id: req.params.id })

    if (!user) res.status(httpStatus.NOT_FOUND).send('User not found')

    user = await Object.assign(user, req.body)

    await user.save()

    res.json(user)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
