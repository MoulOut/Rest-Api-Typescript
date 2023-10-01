import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  res.send('Olá, Dev!');
});  

router.post('/teste', (req, res) => {
  console.log(req);
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});  

export { router };
