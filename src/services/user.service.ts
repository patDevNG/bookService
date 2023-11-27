import { UserRepository } from "../data/repositories/user.repository";
import { IUser } from "../data/entities/user.entities";
import { injectable } from "inversify";

export interface IUserService {
  create(user: IUser): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser | null>;
}

@injectable()
export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   *
   * @param user
   * @returns user
   */
  public async create(user: IUser): Promise<IUser> {
    return await this.userRepository.create(user);
  }

  /**
   *
   * @param email
   * @returns
   */
  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }
}
