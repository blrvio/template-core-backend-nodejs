# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN yarn add

# Copie o restante dos arquivos do projeto para o container
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "start"]
