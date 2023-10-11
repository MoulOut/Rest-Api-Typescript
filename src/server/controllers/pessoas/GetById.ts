import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';

interface ParamProps {
  id?: number;
}

export const getByIdValidation = validation((get) => ({
  params: get<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<ParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: 'O Parametro "id" precisa ser informado.',
      },
    });
  }

  const result = await PessoasProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
