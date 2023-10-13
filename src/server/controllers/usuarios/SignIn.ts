import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { Usuario } from '../../database/models';
import { validation } from '../../shared/middleware';
import { UsuariosProvider } from '../../database/providers/usuarios/Index';
import { PasswordCrypto } from '../../shared/services';

export interface BodyProps extends Omit<Usuario, 'nome' | 'id'> {}

export const signInValidation = validation((get) => ({
  body: get<BodyProps>(
    yup.object().shape({
      senha: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, BodyProps>,
  res: Response
) => {
  const result = await UsuariosProvider.getByEmail(req.body.email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou Senha invalidos',
      },
    });
  }

  const verifyPass = await PasswordCrypto.verifyPassword(
    req.body.senha,
    result.senha
  );

  if (!verifyPass) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou Senha invalidos',
      },
    });
  } else {
    return res.status(StatusCodes.OK).json({ acessToken: 'tokenteste' });
  }
};
