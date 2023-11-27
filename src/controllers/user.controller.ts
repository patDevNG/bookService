import {Response, Request, NextFunction } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { UserService } from '../services/user.service';
import { errorHandler, validateCreateUser } from '../middlewares'
import logger from '../utils/logger';

interface IUserController {
    createUser(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
    getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;

}

@controller('/v1/user')
export class UserController implements IUserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    @httpPost('/create-user', validateCreateUser, errorHandler)

    /**
     * createUser
     * @param req
     * @param res
     * @returns User
     */
    async createUser(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.userService.create(req.body);


        return res.status(201).json({
          status: 'success',
          data: result
        });
      } catch (error) {
        logger.error(error as string);
        next(error);
      }
    }

    @httpGet('/:email', errorHandler)
    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.userService.getUserByEmail(req.body.email);


        return res.status(200).json({
          status: 'success',
          data: result
        });
      } catch (error) {
        logger.error(error as string);
        next(error);
      }
    }
}