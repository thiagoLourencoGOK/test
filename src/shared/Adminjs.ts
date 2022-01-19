import AdminJS from 'adminjs'
import AdminJSMongoose from '@adminjs/mongoose'

import { APP_WEB_PREFIX_PATH } from '@/config/config'

import { CourseModel } from '@/models/courses.model'
import { InstructorModel } from '@/models/instructor.model'
import { ProjectModel } from '@/models/projects.model'
import { TagModel } from '@/models/tag.model'
import { UserModel } from '@/models/user.model'

AdminJS.registerAdapter(AdminJSMongoose)

const adminJs = new AdminJS({
  rootPath: APP_WEB_PREFIX_PATH,
  branding: {
    companyName: 'PRAKS',
  },
  resources: [CourseModel, InstructorModel, ProjectModel, TagModel, UserModel],
})

export default adminJs
