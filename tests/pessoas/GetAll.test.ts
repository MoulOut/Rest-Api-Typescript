import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - GetAll', () => {
  it('deveria retornar 200 e buscar todos os registros', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        nomeCompleto: 'Matheus Moulin',
        cidadeId: 1,
        email: 'mmoulinlima@outlook.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get('/pessoas').send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toBe(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
