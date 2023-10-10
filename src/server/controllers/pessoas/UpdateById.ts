import { Request, Response } from 'express';
import { Pessoa } from '../../database/models';
import { validation } from '../../shared/middleware';
import yup from 'yup';
import { PessoasProvider } from '../../database/providers/pessoas';
import { StatusCodes } from 'http-status-codes';

interface ParamProps {
  id?: number;
}

interface BodyProps extends Omit<Pessoa, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
  body: getSchema<BodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      nomeCompleto: yup.string().required().min(3),
      cidadeId: yup.number().integer().required().min(1),
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
        default: 'O parametro "id" precisa ser informado',
      },
    });
  }
  const result = await PessoasProvider.updateByid(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
