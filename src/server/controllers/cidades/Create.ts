import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface Cidade {
  nome: string,
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<Cidade>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {

  return res.status(StatusCodes.CREATED).json(1);
  
};