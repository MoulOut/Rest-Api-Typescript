import { Router } from 'express';
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from './../controllers';
import { authentication } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
  res.send('Olá, Dev!');
});

router.get(
  '/cidades',
  authentication,
  CidadesController.getAllValidation,
  CidadesController.getAll
);
router.post(
  '/cidades',
  authentication,
  CidadesController.createValidation,
  CidadesController.create
);
router.get(
  '/cidades/:id',
  authentication,
  CidadesController.getByIdValidation,
  CidadesController.getById
);
router.put(
  '/cidades/:id',
  authentication,
  CidadesController.updateByIdValidation,
  CidadesController.updateById
);
router.delete(
  '/cidades/:id',
  authentication,
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

router.get(
  '/pessoas',
  authentication,
  PessoasController.getAllValidation,
  PessoasController.getAll
);
router.post(
  '/pessoas',
  authentication,
  PessoasController.createValidation,
  PessoasController.create
);
router.get(
  '/pessoas/:id',
  authentication,
  PessoasController.getByIdValidation,
  PessoasController.getById
);
router.put(
  '/pessoas/:id',
  authentication,
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);
router.delete(
  '/pessoas/:id',
  authentication,
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

router.post(
  '/entrar',
  UsuariosController.signInValidation,
  UsuariosController.signIn
);
router.post(
  '/cadastrar',
  UsuariosController.signUpValidation,
  UsuariosController.signUp
);

export { router };
