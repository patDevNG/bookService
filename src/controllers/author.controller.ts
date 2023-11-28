import { Response, Request, NextFunction } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { AuthorService } from '../services/author.service'
import logger from '../utils/logger'
import httpStatus from 'http-status'
import { ResponseHandler } from '../utils/errors/responseHandler'
import { validateCreateAuthor } from '../middlewares'

interface IAuthorController {
  createAuthor(req: Request, res: Response): Promise<Response | undefined>
  getAuthorByRefernceId(
    req: Request,
    res: Response
  ): Promise<Response | undefined>
}

@controller('/v1/author')
export class AuthorController implements IAuthorController {
  private authorService: AuthorService

  constructor(authorService: AuthorService) {
    this.authorService = authorService
  }

  /**
   * createAuthor
   * @param req
   * @param res
   * @param next
   */
  @httpPost('/create', validateCreateAuthor)
  async createAuthor(req: Request, res: Response) {
    try {
      const result = await this.authorService.create(req.body)

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
   * getAuthorByRefernceId
   * @param req
   * @param res
   * @param next
   */
  @httpGet('/:referenceId')
  async getAuthorByRefernceId(req: Request, res: Response) {
    try {
      const result = await this.authorService.getAuthorByReferenceId(
        req.params.referenceId
      )

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
