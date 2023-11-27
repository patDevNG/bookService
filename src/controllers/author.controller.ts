
import {Response, Request, NextFunction } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { AuthorService } from '../services/author.service';
import { errorHandler } from '../middlewares'
import logger from '../utils/logger';


interface IAuthorController {
    createAuthor(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
    getAuthorByRefernceId(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
}

@controller('/v1/author')
export class AuthorController implements IAuthorController {
  private authorService: AuthorService;

  constructor(authorService: AuthorService) {
    this.authorService = authorService;
  }

  @httpPost('/create-author', errorHandler)
  /**
   * createAuthor
   */
  async createAuthor(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authorService.create(req.body);

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
   * getAuthorByRefernceId
   */
  async getAuthorByRefernceId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authorService.getAuthorByReferenceId(req.params.referenceId);

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
  
