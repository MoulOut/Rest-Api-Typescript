import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - GetById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'cidades-getbyid@gmail.com';
    await testServer
      .post('/cadastrar')
      .send({ nome: 'Teste', email, senha: 'testpass' });
    const signInRes = await testServer
      .post('/entrar')
      .send({ email, senha: 'testpass' });
    accessToken = signInRes.body.acessToken;
  });

  it('deveria buscar registro por id', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Teixeira de Freitas' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resbuscada = await testServer
      .get(`/cidades/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(resbuscada.statusCode).toBe(StatusCodes.OK);
    expect(resbuscada.body).toHaveProperty('nome');
  });

  it('deveria retornar 500 ao buscar registro que não existe', async () => {
    const res1 = await testServer
      .get('/cidades/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
