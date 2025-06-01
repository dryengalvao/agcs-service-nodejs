const { DataTypes } = require('sequelize');
const database = require('../config/db');
const logger = require('../utils/logger');

// Define o modelo Ticket mapeado com a tabela do banco de dados
const Ticket = database.define('Ticket', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false},
  category: { type: DataTypes.STRING, allowNull: false },
  sentiment: { type: DataTypes.STRING }
}, {
  tableName: 'tickets'
});

/* Sincroniza o modelo com o banco. 
*  O atributo force:true garante que o banco será recriado a cada reinicialização da aplicação.
*  Para garantir a persistência dos dados basta trocar o valor para false.
*/
Ticket.sync({ force: false })
.then(() => {
  logger.info('Tabela tickets sincronizada com o modelo');
})
.catch((exception) => {
  logger.error(`Erro ao sincronizar tabela tickets: ${exception.message}`);
   throw exception;
});

module.exports = Ticket;