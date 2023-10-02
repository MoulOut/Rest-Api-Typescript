import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface Cidade {
  nome: string,
}

export const create = (req: Request<{}, {}, Cidade>, res: Response) => {
  console.log(req.body);
  
  return res.status(StatusCodes.OK).send('City created.');
};