import { model, Schema } from 'mongoose'

export interface ITag {
  id?: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export default interface ITagModel extends Document, ITag {}

const schema = new Schema<ITagModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  { timestamps: true },
)

export const TagModel = model<ITagModel>('Tag', schema)
