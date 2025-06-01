const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

// Rota para checar o status da aplicação
router.get('/', healthController.checkHealth);

module.exports = router;
