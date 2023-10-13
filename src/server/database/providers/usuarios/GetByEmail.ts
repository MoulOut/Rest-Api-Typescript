import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { Usuario } from '../../models';

export const getByEmail = async (email: string): Promise<Usuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
