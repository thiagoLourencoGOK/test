import { TagModel } from '@/models/tag.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function RegisterTagController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const data = req.body

    const tag = new TagModel(data)

    await tag.save()

    res.json(tag)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
