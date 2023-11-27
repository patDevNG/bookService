import { UserModel } from "../models/users.model";
import { IUser } from "../entities/user.entities";

export class StaticUserRepository {
  private static userModel = UserModel;

  /**
   *
   * @param user
   * @returns user
   */
  public static async findByPersonal(
    personalNumber: string
  ): Promise<IUser | null> {
    return await this.userModel.findOne({ personalNumber }).lean();
  }
}
