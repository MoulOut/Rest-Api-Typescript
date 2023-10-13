import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('usuarios - SignUp', () => {
  it('Deveria retornar 201 e criar um registro', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      nome: 'Matheus Moulin',
      senha: '32169ml',
      email: 'mmoulinlima@outlook.com',
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Deveria retornar erro 400 se o nome for muito curto', async () => {
    const res2 = await testServer.post('/cadastrar').send({
      nome: 'Ma',
      senha: '32169ml',
      email: 'mmoulinlima@outlook.com',
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.nome');
  });
});
