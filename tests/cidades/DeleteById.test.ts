import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('cidades - DeleteById', () => {

  it('Deveria retornar 204 e apagar o registro', async () => {
    const res1 = await testServer.post('/cidades').send({ nome: 'Teixeira de Freitas' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/cidades/${res1.body}`).send();
    
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it('Deveria retornar 500 ao tentar apagar um registro que não existe',async () => {
    
    const res1 = await testServer.delete('/cidades/99999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });

});