import { UserModel } from '../models/users.model'
import { IUser } from '../entities/user.entities'
import { AuthorModel } from '../models/author.model'
import { ICategory } from '../entities/category.entities'
import { CategoryModel } from '../models/categories.model'
import { IAuthor } from '../entities/author.entities'

export class StaticUserRepository {
  private static userModel = UserModel

  private static authorModel = AuthorModel

  private static categoryModel = CategoryModel

  /**
   *
   * @param user
   * @param personalNumber
   * @returns user
   */
  public static async findByPersonal(
    personalNumber: string
  ): Promise<IUser | null> {
    return await this.userModel.findOne({ personalNumber }).lean()
  }

  /**
   * @param name
   * @returns category
   */
  public static async findByName(name: string): Promise<ICategory | null> {
    return await this.categoryModel.findOne({ name }).lean()
  }

  /**
   * @param referencdeId
   * @returns author
   */
  public static async findAuthorByReferenceId(
    referenceId: string
  ): Promise<IAuthor | null> {
    return await this.authorModel.findOne({ referenceId }).lean()
  }

  /**
   * @param referenceId
   * @returns category
   */
  public static async findByCategoryReferenceIdCategory(
    referenceId: string
  ): Promise<ICategory | null> {
    return await this.categoryModel.findOne({ referenceId }).lean()
  }
}
