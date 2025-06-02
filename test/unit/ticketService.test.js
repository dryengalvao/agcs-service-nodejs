const { expect } = require('chai');
const ticketService = require('../../src/services/ticketService');
const Ticket = require('../../src/models/ticket');

describe('saveTicket_Success', () => {
  beforeEach(async () => {
    await Ticket.destroy({ where: {} });
  });

  it('deve criar um novo ticket com dados válidos', async () => {
    const data = {
      title: 'Ticket 1',
      description: 'Descrição 1',
      category: 'Categoria A',
      sentiment: 'Positivo'
    };

    const created = await ticketService.save(data);

    expect(created).to.have.property('id');
    expect(created.title).to.equal(data.title);
  });
});

describe('updateTicket_Success', () => {
  beforeEach(async () => {
    await Ticket.destroy({ where: {} });
  });

  it('deve atualizar um ticket existente com dados válidos', async () => {
    const data = await ticketService.save({
      title: 'Ticket Antigo',
      description: 'Descrição Antiga',
      category: 'Categoria B',
    });

    const updated = await ticketService.update(data.id, {
      title: 'Novo Título',
      description: 'Nova descrição',
      category: 'Categoria C',
    });

    expect(updated.title).to.equal('Novo Título');
  });
});

describe('listAllTickets_MultipleTickets_Success', () => {
  beforeEach(async () => {
    await Ticket.destroy({ where: {} });
  });

  it('deve listar todos os tickets salvos', async () => {
    await ticketService.save({
      title: 'Ticket 2',
      description: 'Descrição 2',
      category: 'Categoria A',
    });

    await ticketService.save({
      title: 'Ticket 3',
      description: 'Descrição 3',
      category: 'Categoria B',
    });

    const tickets = await ticketService.list();

    expect(tickets).to.be.an('array');
    expect(tickets).to.have.lengthOf(2);
    expect(tickets[0]).to.have.property('title');
  });
});