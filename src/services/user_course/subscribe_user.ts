import { UserModel } from '@/models/user.model'
import { CourseModel } from '@/models/courses.model'
import SendEmail, { ISendEmail } from '../send_mail'
import { IS_PRODUCTION } from '@/config/config'
import mongoose from 'mongoose'
export interface IUserCourse {
  user_id: string
  course_id: string
}

export default async ({ user_id, course_id }: IUserCourse): Promise<boolean> => {
  try {
    const course = await CourseModel.findOneAndUpdate({ _id: course_id }, { $push: { usersSubscribed: user_id } })

    const users = await UserModel.findOneAndUpdate({ _id: user_id }, { $push: { courses: { course: course._id } } })

    const msg: ISendEmail = {
      to: users.email,
      subject: `Olá seja bem vindo`,
      text: `Seja bem vindo ao curso, ${course.name}`,
      templateName: 'send_email_user_registered.hbs',
      payload: {
        name: users.name,
        courseName: course.name,
        email: users.email,
        appURL: process.env.APP_URL,
        courseURL: `${process.env.APP_FRONT_URL}/${course.slug}`,
      },
    }

    if (IS_PRODUCTION) {
      await SendEmail(msg)
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
