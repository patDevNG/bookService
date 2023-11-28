import { injectable } from 'inversify'
import { UserModel } from '../models/users.model'
import { IUser } from '../entities/user.entities'

interface IUserRepository {
  create(user: IUser): Promise<IUser>
  findById(id: string): Promise<IUser | null>
  findByReferenceId(referenceId: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
}

@injectable()
export class UserRepository implements IUserRepository {
  private userModel = UserModel

  /**
   *
   * @param user
   * @returns user
   */
  public async create(user: IUser): Promise<IUser> {
    return await this.userModel.create(user)
  }

  /**
   *
   * @param id
   * @returns
   */
  public async findById(id: string): Promise<IUser | null> {
    return await this.userModel.findById(id).lean()
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async findByReferenceId(referenceId: string): Promise<IUser | null> {
    return await this.userModel.findOne({ referenceId }).lean()
  }

  /**
   *
   * @param email
   * @returns
   */
  public async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email }).lean()
    ;``
  }
}
