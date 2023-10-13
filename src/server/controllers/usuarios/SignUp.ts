import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UsuariosProvider } from '../../database/providers/usuarios/Index';
import { Usuario } from '../../database/models';
import { validation } from '../../shared/middleware';

export interface BodyProps extends Omit<Usuario, 'id'> {}

export const signUpValidation = validation((get) => ({
  body: get<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6).max(150),
    })
  ),
}));
export const signUp = async (
  req: Request<{}, {}, BodyProps>,
  res: Response
) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
