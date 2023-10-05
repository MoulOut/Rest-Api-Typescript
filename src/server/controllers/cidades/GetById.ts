import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ParamProps {
  id?: number,
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<ParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<ParamProps>, res: Response) => {
  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      errors: {
        default: 'Registro não encontrado.'
      }
    });

  return res.status(StatusCodes.OK).send({
    id: req.params.id,
    nome: 'Teixeira de Freitas'
  });
};