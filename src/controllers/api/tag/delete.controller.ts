import { TagModel } from '@/models/tag.model'
import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function DeleteTagController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const tag = await TagModel.findOne({ _id: req.params.id })
    if (!tag) throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found')
    await tag.delete()
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)

    next(e)
  }
}
