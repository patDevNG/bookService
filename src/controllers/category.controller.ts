import {Response, Request, NextFunction } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { CategoryService } from '../services/category.service';
import { errorHandler } from '../middlewares'
import logger from '../utils/logger';

interface ICategoryController {
    createCategory(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
    getCategoryByRefernceId(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
}

@controller('/v1/category')
export class CategoryController implements ICategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  @httpPost('/create-category', errorHandler)
  /**
   * createCategory
   */
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.categoryService.create(req.body);

      return res.status(201).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      logger.error(error as string);
      next(error);
    }
  
  }

  @httpGet('/:referenceId', errorHandler)
  /**
   * getCategoryByRefernceId
   */
  async getCategoryByRefernceId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.categoryService.getCategoryByReferenceId(req.params.referenceId);

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