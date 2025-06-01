const logger = require('../utils/logger');

const checkHealth = (req, res) => {
  logger.info('Verificando status da aplicação - GET');
  res.status(200).json({
    applicationStatus: 'UP',
    databaseStatus: 'UP'
  });
};

module.exports = { checkHealth };