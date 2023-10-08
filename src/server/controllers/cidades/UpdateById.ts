import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Cidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface ParamProps {
  id?: number;
}

interface BodyProps extends Omit<Cidade, 'id'> {
  nome: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<ParamProps, {}, BodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parametro "id" precisa ser informado.',
      },
    });
  }

  const result = await CidadesProvider.updateByid(req.params.id, req.body);
  
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
