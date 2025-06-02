const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const ticketRoutes = require('../../src/routes/ticketRoutes');
const db = require('../../src/config/db');
const Ticket = require('../../src/models/ticket');

const app = express();
app.use(express.json());
app.use('/api/tickets', ticketRoutes);

describe('POST /api/tickets', () => {
  before(async () => {
    await db.sync({ force: true });
  });

  it('Um Ticket deverá ser criado', async () => {
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

  it('A criação deverá falhar ao enviar campos inválidos', async () => {
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
