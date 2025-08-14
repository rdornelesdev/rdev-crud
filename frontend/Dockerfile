# Usa uma imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência do front-end
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do front-end
COPY . .

# Expõe a porta que o Next.js irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação Next.js
CMD ["npm", "run", "dev"]