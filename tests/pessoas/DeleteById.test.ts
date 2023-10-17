import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - DeleteById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'pessoas-delete@gmail.com';
    await testServer
      .post('/cadastrar')
      .send({ nome: 'Teste', email, senha: 'testpass' });
    const signInRes = await testServer
      .post('/entrar')
      .send({ email, senha: 'testpass' });
    accessToken = signInRes.body.acessToken;
  });

  it('Deveria retornar 204 e apagar o registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Matheus Moulin',
        cidadeId: 1,
        email: 'mmoulinlima@outlook.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/pessoas/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Deveria retornar 500 ao tentar apagar um registro que não existe', async () => {
    const res1 = await testServer
      .delete('/pessoas/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
