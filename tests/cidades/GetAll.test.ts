import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - GetAll', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'cidades-getall@gmail.com';
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
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Teixeira de Freitas' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toBe(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
