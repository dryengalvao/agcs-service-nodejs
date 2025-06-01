const Ticket = require('../models/ticket');
const logger = require('../utils/logger');

class TicketService {
  async save(data) {
    logger.info(`Salvando novo ticket: ${JSON.stringify(data)}`);
    try {
      const ticket = await Ticket.create(data);
      logger.debug(`Ticket criado com sucesso, ID: ${ticket.id}`);
      return ticket;
    } catch (error) {
      logger.error(`Erro ao salvar ticket: ${error.message}`);
      throw error;
    }
  }

  async list() {
    logger.info('Listando todos os tickets');
    return await Ticket.findAll();
  }

  async update(id, updateData) {
    logger.info(`Atualizando ticket ID: ${id}`);
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      throw new Error(`Ticket com ID ${id} não encontrado`);
    }

    return await ticket.update(updateData);
  }
}

module.exports = new TicketService();
