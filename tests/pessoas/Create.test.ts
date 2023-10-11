import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - Create', () => {
  it('Deveria retornar 201 e criar um registro', async () => {
    const res1 = await testServer.post('/pessoas').send({
      nomeCompleto: 'Matheus Moulin',
      cidadeId: 1,
      email: 'mmoulinlima@outlook.com',
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Deveria retornar erro 400 se o nome for muito curto', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Ma' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });
});
