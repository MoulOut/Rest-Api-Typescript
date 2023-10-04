import { Router } from 'express';
import { cidadesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  res.send('Olá, Dev!');
});

router.get('/cidades', cidadesController.getAllValidation, cidadesController.getAll);
router.post('/cidades', cidadesController.createValidation, cidadesController.create);
router.get('/cidades/:id', cidadesController.getByIdValidation, cidadesController.getById);
router.put('/cidades/:id', cidadesController.updateByIdValidation, cidadesController.updateById);
router.delete('/cidades/:id', cidadesController.deleteByIdValidation, cidadesController.deleteById);

export { router };
