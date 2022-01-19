import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import { CourseModel } from '@/models/courses.model'
import SendEmail, { ISendEmail } from '@/services/send_mail'

interface IUser {
  _id?: string
  name?: string
  email?: string
}

export async function WaitListCreateController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const id = req.params.id
    const waitList = req.body
    const user: IUser = req.user

    const course = await CourseModel.findOneAndUpdate({ _id: id }, { $push: { waitList: waitList } })

    const msg: ISendEmail = {
      to: user.email,
      subject: `Você está participando da lista de espera`,
      text: `Você está participando da lista de espera do curso ${course.name}`,
      templateName: 'sending_email_wait_list.hbs',
      payload: {
        name: user.name,
        courseName: course.name,
        email: user.email,
        appURL: process.env.APP_URL,
        courseURL: `${process.env.APP_FRONT_URL}/${course.slug}`,
      },
    }

    await SendEmail(msg)

    return res.json({ success: true })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
