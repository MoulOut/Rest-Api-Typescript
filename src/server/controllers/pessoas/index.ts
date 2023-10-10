import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as getall from './GetAll';
import * as create from './Create';
import * as updateById from './UpdateById';

export const PessoasController = {
  ...getById,
  ...deleteById,
  ...getall,
  ...create,
  ...updateById,
};
