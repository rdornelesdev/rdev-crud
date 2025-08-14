# Usa uma imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência do back-end
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do back-end
COPY . .

# Expõe a porta que o seu servidor Express irá rodar
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]