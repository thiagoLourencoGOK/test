import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import { UserModel } from '@/models/user.model'
import { SEND_EMAIL_FROM } from '@/config/config'
import SendEmail, { ISendEmail } from '@/services/send_mail'

export async function ResetPasswordSend(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { email } = req.body

    const user = await UserModel.findOne({ email: email })

    if (!user) res.status(httpStatus.NOT_FOUND).send('User not found')

    user.generatePasswordReset()
    user.save()

    const msg: ISendEmail = {
      to: user.email,
      subject: 'Alteração de senha',
      text: 'Alteração de senha',
      templateName: 'reset_password_send_template.hbs',
      payload: {
        email: user.email,
        frontendUrl: process.env.FRONTEND_URL,
        token: user.resetPasswordToken,
      },
    }

    await SendEmail(msg)

    return res.json({ message: 'E-mail enviado com sucesso' })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
