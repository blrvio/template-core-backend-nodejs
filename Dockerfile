# Use a imagem oficial do Node.js Alpine como base
FROM node:20-alpine

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN yarn install

# Copie o restante dos arquivos do projeto para o container
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "start"]
