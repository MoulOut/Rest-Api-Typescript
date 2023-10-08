import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';

interface ParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<ParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O Parametro "id" precisa ser informado.',
      },
    });
  }

  const result = await CidadesProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
