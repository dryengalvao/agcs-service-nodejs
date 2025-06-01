const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './agcs.db',
  logging: (log) => logger.debug(log), // Redireciona logs do Sequelize para o Winston
});

// Realiza os teste de conexão com o banco dados
sequelize.authenticate()
  .then(() => {
    logger.info('Conectado ao banco com sucesso.');
  })
  .catch((exception) => {
    logger.error(`Erro ao conectar ao banco: ${exception.message}`);
    throw exception;
  });

module.exports = sequelize;