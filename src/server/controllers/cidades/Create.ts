import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface Cidade {
  nome: string,
  estado: string,
}

interface Filter {
  filter?: string,
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<Cidade>(yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
  })),
  query: getSchema<Filter>(yup.object().shape({
    filter: yup.string().optional().min(3)
  })),
}));

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {

  console.log(req.body);

  return res.status(StatusCodes.OK).send('City created.');
};