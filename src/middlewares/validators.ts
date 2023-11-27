import { Response, NextFunction, Request } from 'express';
import { userSchema } from '../utils/validation/userValidationSchema';
import { StaticUserRepository } from '../data/repositories/static.repository';
import { BadRequestError } from './error';

/**
 * Validate create user request
 * @param req
 * @param res
 * @param next
 */
export const validateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
try {
  const { error } = userSchema.validate(req.body);


  if(error) {
    throw new BadRequestError(error.details[0].message);
  }
  const checkPersonalNumber = await StaticUserRepository.findByPersonal(req.body.personalNumber);


  if(checkPersonalNumber) {
    throw new BadRequestError('PersonalNumber already exists');
  }

  next()
} catch (error) {
  next(error);
}
};
