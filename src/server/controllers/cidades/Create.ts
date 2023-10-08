import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Cidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface BodyProps extends Omit<Cidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {
  const result = await CidadesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
