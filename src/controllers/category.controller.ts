import { Response, Request } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { CategoryService } from '../services/categories.service'
import logger from '../utils/logger'
import httpStatus = require('http-status')
import { ResponseHandler } from '../utils/errors/responseHandler'
import { validateCreateCategory } from '../middlewares'

interface ICategoryController {
  createCategory(req: Request, res: Response): Promise<Response | undefined>
  getCategoryByRefernceId(
    req: Request,
    res: Response
  ): Promise<Response | undefined>
}

@controller('/v1/category')
export class CategoryController implements ICategoryController {
  private categoryService: CategoryService

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService
  }

  /**
   * createCategory
   */
  @httpPost('/create', validateCreateCategory)
  async createCategory(req: Request, res: Response) {
    try {
      const result = await this.categoryService.create(req.body)

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
   * getCategoryByRefernceId
   */
  @httpGet('/:referenceId')
  async getCategoryByRefernceId(req: Request, res: Response) {
    try {
      const result = await this.categoryService.getCategoryByReferenceId(
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
