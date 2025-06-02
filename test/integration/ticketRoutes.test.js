const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const ticketRoutes = require('../../src/routes/ticketRoutes');
const db = require('../../src/config/db');

const app = express();
app.use(express.json());
app.use('/api/tickets', ticketRoutes);

describe('createTicket_ReturnsCreatedTicket', () => {
  before(async () => {
    await db.sync({ force: true });
  });

  it('deve criar um ticket com sucesso via endpoint', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({
        title: 'Chamado teste',
        description: 'Detalhes do chamado',
        category: 'Categoria D',
        sentiment: 'Neutro'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.title).to.equal('Chamado teste');
  });
});

describe('createTicket_WithBlankFields_ReturnsValidationErrors', () => {
  before(async () => {
    await db.sync({ force: true });
  });

  it('deve retornar erros de validação ao enviar campos obrigatórios em branco', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({
        title: '',
        description: '',
        category: ''
      });

    expect(res.status).to.equal(422);
    expect(res.body.errors).to.be.an('array');
  });
});