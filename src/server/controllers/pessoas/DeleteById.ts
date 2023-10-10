import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';

interface ParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<ParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O Parametro "id" precisa ser informado.',
      },
    });
  }

  const result = PessoasProvider.deleteById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
