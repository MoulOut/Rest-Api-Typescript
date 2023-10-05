import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - UpdateById', () => {

  it('deveria retornar 200 e atualizar o registro', async () => {

    const res1 = await testServer.post('/cidades').send({ nome: 'Teixeira de Freitas' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/cidades/${res1.body}`).send({ nome: 'Teixeira' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('deveria retornar 500 se o registro não existir', async () => {

    const res1 = await testServer.put('/cidades/99999').send({ nome: 'Teixeira' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});