import {Response, Request, NextFunction } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { BookService } from '../services/book.service';
import { errorHandler } from '../middlewares'
import logger from '../utils/logger';

interface IBookController {
    createBook(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
    getBookByReferenceId(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
    searchBook(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
    checkOutBook(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
    checkInBook(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
}

@controller('/v1/book')
export class BookController implements IBookController {
    private readonly bookService: BookService;

    constructor(bookService: BookService) {
        this.bookService = bookService;
    }

    @httpPost('/create-book', errorHandler)

    /**
     * createBook
     * @param req
     * @param res
     * @returns Book
     */
    async createBook(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.bookService.create(req.body);

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
    async getBookByReferenceId(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.bookService.getBookByReferenceId(req.params.referenceId);

        return res.status(200).json({
          status: 'success',
          data: result
        });
      } catch (error) {
        logger.error(error as string);
        next(error);
      }
    }

    @httpGet('/search/:authorOrTitle', errorHandler)
    async searchBook(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.bookService.searchBook(req.params.authorOrTitle);

        return res.status(200).json({
          status: 'success',
          data: result
        });
      } catch (error) {
        logger.error(error as string);
        next(error);
      }
    }

    @httpPost('/check-out-book', errorHandler)
    async checkOutBook(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.bookService.checkOutBook(req.body.id, req.body.userId, req.body.checkInDate);

        return res.status(200).json({
          status: 'success',
          data: result
        });
      } catch (error) {
        logger.error(error as string);
        next(error);
      }
    }

    @httpPost('/check-in-book', errorHandler)
    async checkInBook(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.bookService.checkInBook(req.body.id, req.body.userId);

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

