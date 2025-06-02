#!/bin/bash

# Define cores para saída no terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Função para exibir mensagens de erro e sair
error_exit() {
    echo -e "${RED}ERRO: $1${NC}" >&2
    exit 1
}

# Verifica se o Docker está instalado
if ! command -v docker &> /dev/null; then
    error_exit "Docker não está instalado. Por favor, instale-o e tente novamente."
fi

# Executa os testes unitários disponiveis
echo -e "${GREEN}Executando testes unitários e de integração...${NC}"
npm test || error_exit "Falha nos testes. Corrija os testes antes de prosseguir."

# Garantir que a pasta data exista no host
mkdir -p $(pwd)/data || error_exit "Falha ao criar a pasta local ./data"

echo -e "${GREEN}Construindo a imagem Docker 'agcs-node-service'...${NC}"
docker build -f Dockerfile.agcs-node -t agcs-node-service:latest . || error_exit "Falha ao construir a imagem Docker."

# Parar e remover container antigo, se existir
docker stop agcs-node-service-container 2>/dev/null
docker rm agcs-node-service-container 2>/dev/null

eecho -e "${GREEN}Executando o container 'agcs-node-service-container'...${NC}"
docker run -d \
  --name agcs-node-service-container \
  -p 8085:8085 \
  -v $(pwd)/data:/app/data \
  agcs-node-service:latest || error_exit "Falha ao executar o container."

echo -e "${GREEN}Aplicação AGCS (Node.js) iniciada com sucesso! Acesse em http://localhost:8085${NC}"
echo "Para parar o container, use: docker stop agcs-node-service-container"
echo "Para remover o container, use: docker rm agcs-node-service-container"
echo "Para remover a imagem, use: docker rmi agcs-node-service:latest"