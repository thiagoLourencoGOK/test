import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

import { SEND_EMAIL_FROM } from '@/config/config'
import sgMail, { ClientResponse } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export interface ISendEmail {
  to: string
  subject: string
  text: string
  payload: any
  templateName: string
}

export default async (msg: ISendEmail): Promise<[ClientResponse, unknown] | false> => {
  try {
    const templatePath = path.resolve('../views/', msg.templateName)
    const stream = await fs.promises.readFile(templatePath, 'utf8')
    const template = handlebars.compile(stream)

    const data = await sgMail.send({
      ...msg,
      from: SEND_EMAIL_FROM,
      html: template(msg.payload),
    })

    return data
  } catch (err) {
    return false
  }
}
