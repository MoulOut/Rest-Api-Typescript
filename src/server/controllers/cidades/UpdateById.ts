import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ParamProps {
  id?: number,
}

interface BodyProps {
  nome: string,
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<BodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
  params: getSchema<ParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<ParamProps, {}, BodyProps>, res: Response) => {
  console.log(req.body);
  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado.');
};