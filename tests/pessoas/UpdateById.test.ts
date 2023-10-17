import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - UpdateById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'pessoas-update@gmail.com';
    await testServer
      .post('/cadastrar')
      .send({ nome: 'Teste', email, senha: 'testpass' });
    const signInRes = await testServer
      .post('/entrar')
      .send({ email, senha: 'testpass' });
    accessToken = signInRes.body.acessToken;
  });

  it('deveria retornar 204 e atualizar o registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Matheus Moulin',
        cidadeId: 1,
        email: 'mmoulinlima@outlook.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/pessoas/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Matheus Moulin',
        cidadeId: 2,
        email: 'mmoulinlima@outlook.com',
      });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('deveria retornar 500 se o registro não existir', async () => {
    const res1 = await testServer
      .put('/pessoas/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Matheus Moulin',
        cidadeId: 1,
        email: 'mmoulinlima@outlook.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
