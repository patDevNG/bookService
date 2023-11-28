import { Response } from 'express'

export class ResponseHandler {
  /**
   *
   * @param res
   * @param data
   * @param statusCode
   * @returns
   */
  public static successResponse(res: Response, data: any, statusCode: number) {
    return res.status(statusCode).json({
      status: 'success',
      data,
    })
  }

  /**
   *
   * @param res
   * @param message
   * @param statusCode
   * @returns
   */
  public static errorResponse(
    res: Response,
    message: string,
    statusCode: number
  ) {
    console.log('message', message)

    return res.status(statusCode).json({
      status: 'error',
      message,
    })
  }
}
