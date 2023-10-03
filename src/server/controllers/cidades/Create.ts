import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface Cidade {
  nome: string,
  estado: string,
}

interface Filter {
  filter?: string,
}

const bodyValidator: yup.ObjectSchema<Cidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(2),
});

const queryValidator: yup.ObjectSchema<Filter> = yup.object().shape({
  filter: yup.string().required().min(3)
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidator.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });
    
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidator.validate(req.query, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });
    
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};


export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {

  console.log(req.body);

  return res.status(StatusCodes.OK).send('City created.');
};