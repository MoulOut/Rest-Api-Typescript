import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - GetAll', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'pessoas-getall@gmail.com';
    await testServer
      .post('/cadastrar')
      .send({ nome: 'Teste', email, senha: 'testpass' });
    const signInRes = await testServer
      .post('/entrar')
      .send({ email, senha: 'testpass' });
    accessToken = signInRes.body.acessToken;
  });

  it('deveria retornar 200 e buscar todos os registros', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Matheus Moulin',
        cidadeId: 1,
        email: 'mmoulinlima@outlook.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toBe(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
