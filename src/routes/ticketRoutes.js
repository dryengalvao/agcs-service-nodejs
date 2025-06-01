const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const ticketValidation = require("../middleware/ticketValidation");

// Rota para criar um ticket com validação dos campos do ticket
router.post('/', ticketValidation, ticketController.create);

// Rota para listar todos os tickets
router.get('/', ticketController.list);

// Rota para atualizar um ticket com validação dos campos do ticket
router.put('/:id', ticketValidation, ticketController.update);

module.exports = router;