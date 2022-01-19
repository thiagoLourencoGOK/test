import { NextFunction, Request, Response } from 'express'

import { UserModel } from '@/models/user.model'
import httpStatus from 'http-status'

export async function ResetPassword(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { token } = req.params
    const { newPassword } = req.body

    const user = await UserModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

    if (!user) res.status(httpStatus.NOT_FOUND).send('User not found')

    user.setPassword(newPassword)

    user.save()

    return res.json({ message: 'Senha Atualizada com Sucesso' })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
