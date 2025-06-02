# AGCS - Aplicação de Gerenciamento de Chamados de Serviço

O **AGCS** é uma aplicação backend desenvolvida em Node.js + Express para gerenciamento de chamados (tickets), desenvolvida como parte de um desafio técnico para o processo seletivo **Analista IV – Desenvolvedor(a) back-end** do **CNI - Confederação Nacional da Indústria**. A API permite criar, listar e atualizar tickets, com validações, tratamento de erros, e suporte a monitoramento de saúde da aplicação.

Para acessar a versão em **`Java + Spring`** acesse [https://github.com/dryengalvao/agcs-service]

## Justificativa da Tecnologia Escolhida

- **Node.js + Express**: Escolhido por ser um framework leve e flexível para APIs REST, com ampla adoção e suporte a desenvolvimento rápido.
- **SQLite**: Banco leve e embutido, ideal para protótipos e testes, eliminando a necessidade de configuração externa.
- **Sequelize**: ORM para Node.js, facilitando a interação com o banco SQLite e operações CRUD.
- **Winston**: Biblioteca de logging eficiente, utilizada para rastreamento de operações.
- **Express-Validator**: Utilizado para validação de dados de entrada nos endpoints.
- **Mocha, Chai e Supertest**: Ferramentas padrão para testes unitários e de integração, permitindo validação isolada e simulação de requisições HTTP.
- **Nodemon**: Utilizado para reinicialização automática do servidor durante o desenvolvimento.

## Organização do Repositório e Decisões de Design

O código-fonte está disponível no GitHub: [https://github.com/dryengalvao/agcs-service-nodejs](https://github.com/dryengalvao/agcs-service-nodejs).

### Estrutura do Repositório

O repositório foi organizado em pastas modulares para garantir clareza e escalabilidade:
- **src/controllers**: Contém os controladores (`ticketController`, `healthController`) que gerenciam a lógica dos endpoints.
- **src/services**: Contém a lógica de negócios (`ticketService`), separando a camada de controle da persistência.
- **src/models**: Inclui o modelo `Ticket`, mapeado para a tabela `tickets` no banco.
- **src/middleware**: Contém o middleware de validação (`ticketValidation`) para verificação de dados de entrada.
- **src/routes**: Define as rotas da API (`ticketRoutes`, `healthRoutes`).
- **src/config**: Configuração do banco de dados SQLite (`db.js`).
- **src/utils**: Utilitários como o logger Winston (`logger.js`).
- **test**: Contém os testes unitários (`ticketService.test.js`) e de integração (`ticketRoutes.test.js`).

### Decisão de Nomes, Mensagens de Logs e Comentários

- Os nomes de variáveis, classes, métodos e pastas foram escritos em inglês (ex.: `ticketController`, `ticketService`, `save`), seguindo padrões comuns da comunidade Node.js.
- As mensagens de logs e comentários no código foram mantidos em português para melhor entendimento e facilitar a depuração.

## Configuração e Execução

### Pré-requisitos
- Node.js 18 ou superior.
- Git (para clonar o repositório).

### Passos para Configurar e Executar

**1. Clone o Repositório Git**:
```bash
git clone https://github.com/dryengalvao/agcs-service-nodejs.git
cd agcs-service-nodejs
```

**2. Instale as Dependências**:
```bash
npm install
```

**3. Execute a Aplicação**:
```bash
npm start
```

A aplicação estará disponível em *http://localhost:8085*.

### Testes Unitários e de Integração

#### Testes Unitários Implementados:
- **saveTicket_Success**: Testa a persistência de um ticket com dados válidos, garantindo que ele seja salvo corretamente.
- **updateTicket_Success**: Verifica se a atualização de um ticket existente com dados válidos é realizada com sucesso.
- **listAllTickets_MultipleTickets_Success**: Garante que múltiplos tickets salvos sejam listados corretamente.

#### Testes de Integração Implementados:
- **createTicket_ReturnsCreatedTicket**: Verifica se a criação de um ticket via endpoint retorna status 201 (Created) e os dados esperados.
- **createTicket_WithBlankFields_ReturnsValidationErrors**: Testa se a criação de um ticket com campos obrigatórios em branco retorna status 422 (Unprocessable Entity) e mensagens de validação.


#### Executar os Testes:
```bash
npm test
```

### Acesse o Banco de Dados
O banco SQLite está configurado no arquivo `./data/agcs.db`. Ferramentas como o *DB Browser for SQLite* podem ser usadas para visualização.

## Exemplos de Chamadas aos Endpoints

### 1. Criar um Ticket (POST /api/tickets)

**Chamada**:
```bash
curl -X POST http://localhost:8085/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Problema com impressora",
    "description": "Impressora não está funcionando",
    "category": "Hardware",
    "sentiment": null
  }'
```

**Resposta Esperada (HTTP 201)**:
```json
{
  "id": 1,
  "title": "Problema com impressora",
  "description": "Impressora não está funcionando",
  "category": "Hardware",
  "sentiment": null,
  "createdAt": "2025-05-31T23:55:00.123Z",
  "updatedAt": "2025-05-31T23:55:00.123Z"
}
```

### 2. Listar Todos os Tickets (GET /api/tickets)

**Chamada**:
```bash
curl -X GET http://localhost:8085/api/tickets
```

**Resposta Esperada (HTTP 200)**:
```json
[
  {
    "id": 1,
    "title": "Problema com impressora",
    "description": "Impressora não está funcionando",
    "category": "Hardware",
    "sentiment": null,
    "createdAt": "2025-05-31T23:55:00.123Z",
    "updatedAt": "2025-05-31T23:55:00.123Z"
  }
]
```

### 3. Atualizar um Ticket (PUT /api/tickets/{id})

**Chamada**:
```bash
curl -X PUT http://localhost:8085/api/tickets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Problema com impressora - Atualizado",
    "description": "Impressora ainda não funciona",
    "category": "Hardware"
  }'
```

**Resposta Esperada (HTTP 200)**:
```json
{
  "id": 1,
  "title": "Problema com impressora - Atualizado",
  "description": "Impressora ainda não funciona",
  "category": "Hardware",
  "sentiment": null,
  "createdAt": "2025-05-31T23:55:00.123Z",
  "updatedAt": "2025-05-31T23:56:00.654Z"
}
```

### 4. Verificar o Status da Aplicação (GET /api/health)

**Chamada**:
```bash
curl -X GET http://localhost:8085/api/health
```

**Resposta Esperada (HTTP 200)**:
```json
{
  "applicationStatus": "UP",
  "databaseStatus": "UP"
}
```
-------------------------------
## Recursos Extras

### Executando a Aplicação em um Container Docker

O repositório inclui suporte para execução em container Docker.

#### Requisitos
- **Docker**: Versão 24.x ou superior (`docker --version`).
- **Sistema Operacional**: Linux (recomendado Ubuntu 22.04 ou superior), macOS ou Windows com WSL2.
- **Git**: Para clonar o repositório.
- **Acesso à Internet**: Para baixar a imagem base `node:20-alpine` e dependências.

#### Passo a Passo
1. Clone o repositório e acesse a pasta do projeto.
2. Certifique-se de que o script `build-and-run-node.sh` tem permissões de execução:
```bash
chmod +x build-and-run-node.sh
```
3. Execute o script:
```bash
./build-and-run-node.sh
```
O script compila a aplicação, executa os testes unitários e de integração, constrói a imagem Docker e inicia o container. 

A aplicação estará disponível em `http://localhost:8085`.

#### Gerenciamento do Container
- **Logs**: `docker logs agcs-node-service-container`
- **Parar**: `docker stop agcs-node-service-container`
- **Remover Container**: `docker rm agcs-node-service-container`
- **Remover Imagem**: `docker rmi agcs-node-service:latest`
