# Praks Backend

<p align="center">
  <img src="docs/img/logo.png" height="50" />
</p>

<p align="center">
<img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/>
<img alt="Nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img alt="Mongodb" src="https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B"/>
<img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
</p>

## Sobre 📖

Repositorio do backend da [Praks](https://praks.digital). Desenvolvido em Nodejs com Express, MongoDB, Typescript e Passport.

## Requisitos

- Nodejs 16.
- MongoDB.
- Yarn

## Instalando 🚀

Clone o repositorio:

```sh
git clone https://github.com/gok-dev/praks-back
```

Navegue até a pasta do projeto:

```sh
cd praks-back
```

Instale as dependencias:

```sh
yarn
```

Preencha o `.env` com base no `.env.example`.

### Configurando Oauth

#### Facebook:

[Crie uma conta de desenvolvedor](https://developers.facebook.com/apps) e crie um aplicativo de login e adicione a permissão para e-mail.

Copie o ID do aplicativo e o Secret para o .env.

Coloque a URL do seu servidor no .env.

> O Facebook aceita apenas requisições em HTTPS, sugiro usar o [Ngrok](https://ngrok.com) para ter chamadas em HTTPS no localhost.

## Rodando o projeto ⚛️

### Desenvolvimento

```sh
yarn dev
```

### Produção

Gerar build

```sh
yarn build
```

Rodar o projeto

```sh
yarn start
```

<div align="center">

### Made with 💚 in GOK.

</div>
