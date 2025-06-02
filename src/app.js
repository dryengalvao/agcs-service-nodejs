const express = require('express');
const app = express();
const logger = require('./utils/logger');
const ticketRoutes = require('./routes/ticketRoutes');
const healthRoutes = require('./routes/healthRoutes');
const fs = require('fs');
const path = require('path');

const PORT = 8085;

app.use(express.json());

//Validação para a criação da pasta local do banco de dados do sqlite
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

//Metodo para instanciação da base de dados
(async () => {
  const database = require("./config/db");
  await database.sync();
})();

//Rotas para Tickets
app.use('/api/tickets', ticketRoutes);

//Rota para o Helth Check da aplicação
app.use('/api/health', healthRoutes);

app.listen(PORT, '0.0.0.0',() => {
  logger.info(`APLICAÇÃO ONLINE : ${PORT}`);
});