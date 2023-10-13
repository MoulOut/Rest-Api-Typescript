import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('usuarios - SignIn', () => {
  beforeAll(async () => {
    await testServer.post('/cadastrar').send({
      nome: 'Matheus Moulin',
      senha: '32169ml',
      email: 'mmoulinlima@outlook.com',
    });
  });

  it('Deveria retornar 200 e retornar token de acesso', async () => {
    const resBuscada = await testServer
      .post('/entrar')
      .send({ email: 'mmoulinlima@outlook.com', senha: '32169ml' });

    expect(resBuscada.status).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('acessToken');
  });

  it('Deveria retornar erro 401 se a senha estiver errada', async () => {
    const res2 = await testServer.post('/entrar').send({
      senha: '3216958ml',
      email: 'mmoulinlima@outlook.com',
    });

    expect(res2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res2.body).toHaveProperty('errors.default');
  });

  it('Deveria retornar erro 401 se o email estiver errado', async () => {
    const res2 = await testServer.post('/entrar').send({
      senha: '3216958ml',
      email: 'moulinlimam@outlook.com',
    });

    expect(res2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res2.body).toHaveProperty('errors.default');
  });
  
});
