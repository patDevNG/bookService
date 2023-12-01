import { Response, Request } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { UserService } from '../services/user.service'
import { validateCreateUser } from '../middlewares'
import { ResponseHandler } from '../utils/errors/responseHandler'
import logger from '../utils/logger'
import httpStatus from 'http-status'

interface IUserController {
  createUser(req: Request, res: Response): Promise<Response | undefined>
  getUserByEmail(req: Request, res: Response): Promise<Response | undefined>
}

@controller('/v1/user')
export class UserController implements IUserController {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  /**
   * createUser
   * @param req
   * @param res
   * @returns User
   */
  @httpPost('/create', validateCreateUser)
  async createUser(req: Request, res: Response) {
    try {
      const result = await this.userService.create(req.body)

      console.log('result', result)

      return ResponseHandler.successResponse(res, result, httpStatus.CREATED)
    } catch (error) {
      logger.error(error as string)

      return ResponseHandler.errorResponse(
        res,
        error as string,
        httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  @httpGet('/:email')
  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params
      const result = await this.userService.getUserByEmail(email)

      return ResponseHandler.successResponse(res, result, httpStatus.OK)
    } catch (error) {
      logger.error(error as string)

      return ResponseHandler.errorResponse(
        res,
        error as string,
        httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
