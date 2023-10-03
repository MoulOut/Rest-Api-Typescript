import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface Cidade {
  nome: string,
}

const bodyValidator: yup.ObjectSchema<Cidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {
  let validatedData: Cidade | undefined = undefined;

  try {
    validatedData = await bodyValidator.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;
    return res.json({
      errors: {
        default: yupError.message,
      }
    });
  }

  console.log(validatedData);

  return res.status(StatusCodes.OK).send('City created.');
};