import { UserModel } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function LoginController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user || !user.validPassword(password))
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid email or password')

    res.status(201).json(user.toAuthJSON())
  } catch (e) {
    res.status(401).json({ message: 'Invalid email or password' })
    next(e)
  }
}
