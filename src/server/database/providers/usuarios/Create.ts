import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Usuario } from '../../models';

export const create = async (
  usuario: Omit<Usuario, 'id'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.usuario)
      .insert(usuario)
      .returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro.');
  }
};
