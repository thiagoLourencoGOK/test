import { CourseModel } from '@/models/courses.model'
import mongoose from 'mongoose'
export interface IUserCourse {
  user_id: string
  course_id: string
}

export default async ({ user_id, course_id }: IUserCourse): Promise<boolean> => {
  try {
    const course = await CourseModel.findOne({ _id: course_id })

    const check = course.usersSubscribed.find((user: any) => new mongoose.Types.ObjectId(user_id).equals(user))

    return !!check
  } catch (error) {
    return false
  }
}
