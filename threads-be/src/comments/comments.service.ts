import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Comment } from './schemas/comment.schema'

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentModel.create({
      text: createCommentDto.text,
      parent: createCommentDto.parentId,
      user: createCommentDto.userId,
      likes: 0,
    }).then((doc) => {
      return doc.populate(['user', 'parent'])
    })
  }

  findAll() {
    return this.commentModel.find().populate(['user', 'parent']).exec()
  }

  getTopLevelComments() {
    return this.commentModel
      .find({
        parent: null
      })
      .populate(['user', 'parent'])
      .sort({createdAt: -1})
      .exec()
  }

  getCommentsByParentId(parentId: string) {
    return this.commentModel
      .find({
        parent: parentId
      })
      .populate(['user', 'parent'])
      .sort({createdAt: -1})
      .exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`
  }

  remove(id: number) {
    return `This action removes a #${id} comment`
  }
}
