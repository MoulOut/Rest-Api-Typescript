import { Request, Response } from 'express';
import { Pessoa } from '../../database/models';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';

interface BodyProps extends Omit<Pessoa, 'id'> {}

export const createValidation = validation((get) => ({
  body: get<BodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      nomeCompleto: yup.string().required().min(3),
      cidadeId: yup.number().integer().required().min(1),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, BodyProps>,
  res: Response
) => {
  const result = await PessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
