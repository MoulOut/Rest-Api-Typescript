import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Pessoa } from '../../models';

export const getById = async (id: number): Promise<Pessoa | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar Registro.');
  }
};
