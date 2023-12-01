import { Response, Request } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { BookService } from '../services/book.service'
import logger from '../utils/logger'
import { ResponseHandler } from '../utils/errors/responseHandler'
import httpStatus from 'http-status'
import { validateCreateBook } from '../middlewares/validators'

interface IBookController {
  createBook(req: Request, res: Response): Promise<Response | undefined>
  getBookByReferenceId(
    req: Request,
    res: Response
  ): Promise<Response | undefined>
  searchBook(req: Request, res: Response): Promise<Response | undefined>
  checkOutBook(req: Request, res: Response): Promise<Response | undefined>
  checkInBook(req: Request, res: Response): Promise<Response | undefined>
  getBooks(req: Request, res: Response): Promise<Response | undefined>
}

@controller('/v1/book')
export class BookController implements IBookController {
  private readonly bookService: BookService

  constructor(bookService: BookService) {
    this.bookService = bookService
  }

  @httpPost('/create', validateCreateBook)

  /**
   * createBook
   * @param req
   * @param res
   * @returns Book
   */
  async createBook(req: Request, res: Response) {
    try {
      const result = await this.bookService.create(req.body)

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

  @httpGet('/:referenceId')
  async getBookByReferenceId(req: Request, res: Response) {
    try {
      const result = await this.bookService.getBookByReferenceId(
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

  @httpGet('/')
  async searchBook(req: Request, res: Response) {
    try {
      const { search } = req.query as any

      if (search === undefined)
        return ResponseHandler.errorResponse(
          res,
          'Please provide title or author',
          httpStatus.BAD_REQUEST
        )
      const result = await this.bookService.searchBook(search)

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

  @httpPost('/checkout')
  async checkOutBook(req: Request, res: Response) {
    try {
      const result = await this.bookService.checkOutBook(
        req.body.id,
        req.body.userId,
        req.body.checkInDate
      )

      return ResponseHandler.successResponse(res, result, httpStatus.OK)
    } catch (error) {
      logger.error(error as string)
      ResponseHandler.errorResponse(
        res,
        error as string,
        httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @httpPost('/checkin')
  async checkInBook(req: Request, res: Response) {
    try {
      const result = await this.bookService.checkInBook(
        req.body.id,
        req.body.userId
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

  @httpGet('/')
  async getBooks(req: Request, res: Response) {
    try {
      const result = await this.bookService.getBooks()

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
