import { Router } from 'express';

import { cidadesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  res.send('Olá, Dev!');
});

router.post('/cidades', cidadesController.createValidation, cidadesController.create);

export { router };
