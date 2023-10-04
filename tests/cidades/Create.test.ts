import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - Create', () => {

  it('Deveria criar um registro', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Teixeira de freitas' });
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('Deveria retornar erro 400 se o nome for muito curto', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Te'});
  
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

});