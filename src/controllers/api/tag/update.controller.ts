import { TagModel } from '@/models/tag.model'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function UpdateTagController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    let tag = await TagModel.findOne({ _id: req.params.id })

    if (!tag) res.status(httpStatus.NOT_FOUND).send({ message: 'Tag not found' })

    tag = await Object.assign(tag, req.body)

    await tag.save()

    res.json(tag)
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
