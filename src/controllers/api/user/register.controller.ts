import { UserModel } from '@/models/user.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function RegisterUserController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const data = req.body

    const user = new UserModel(data)
    user.setPassword(data.password)

    await user.save()

    res.json(user.toAuthJSON())
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
