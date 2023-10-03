import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface Cidade {
  nome: string,
  estado: string,
}

const bodyValidator: yup.ObjectSchema<Cidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(2),
});

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {
  let validatedData: Cidade | undefined = undefined;

  try {
    validatedData = await bodyValidator.validate(req.body, { abortEarly: false });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ Errors: errors });
  }

  console.log(validatedData);

  return res.status(StatusCodes.OK).send('City created.');
};