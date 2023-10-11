import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - GetById', () => {
  it('deveria retornar 201 e buscar registro por id', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        nomeCompleto: 'Matheus Moulin',
        cidadeId: 1,
        email: 'mmoulinlima@outlook.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resbuscada = await testServer.get(`/pessoas/${res1.body}`).send();

    expect(resbuscada.statusCode).toBe(StatusCodes.OK);
    expect(resbuscada.body).toHaveProperty('nomeCompleto');
  });

  it('deveria retornar 500 ao buscar registro que não existe', async () => {
    const res1 = await testServer.get('/pessoas/99999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
