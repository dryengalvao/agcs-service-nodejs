const logger = require('../utils/logger');
const ticketService = require('../services/ticketService');

class TicketController {
  async create(req, res) {
    logger.info("Solicitação para criação de um novo ticket recebida - POST");
    try {
      const created = await ticketService.save(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    logger.info("Solicitação para listagem de todos os tickets recebida - GET");
    try {
      const tickets = await ticketService.list();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    logger.info("Solicitação para atualização de ticket recebida - PUT");
    try {
      const updated = await ticketService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TicketController();
