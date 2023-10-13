import { Cidade, Pessoa, Usuario } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    cidade: Cidade;
    pessoa: Pessoa
    usuario: Usuario
  }
}
