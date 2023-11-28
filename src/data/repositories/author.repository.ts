import { injectable } from 'inversify'
import { AuthorModel } from '../models/author.model'
import { IAuthor } from '../entities/author.entities'

interface IAuthorRepository {
  create(author: IAuthor): Promise<IAuthor>
  findByReferenceId(referenceId: string): Promise<IAuthor | null>
}

@injectable()
export class AuthorRepository implements IAuthorRepository {
  private authorModel = AuthorModel

  /**
   *
   * @param author
   * @returns author
   */
  public async create(author: IAuthor): Promise<IAuthor> {
    return await this.authorModel.create(author)
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async findByReferenceId(referenceId: string): Promise<IAuthor | null> {
    return await this.authorModel.findOne({ referenceId }).lean()
  }
}
