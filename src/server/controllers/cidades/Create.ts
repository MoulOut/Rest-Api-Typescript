import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Cidade } from '../../database/models';

interface BodyProps extends Omit<Cidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};
