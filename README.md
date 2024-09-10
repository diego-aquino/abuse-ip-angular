# AbuseIP Angular

Projeto desenvolvido com Angular para buscar informações de um IP na API do [AbuseIPDB](https://docs.abuseipdb.com/).

## Pré-requisitos

- [Node.js v20.11.0](https://nodejs.org/en/)
- [pnpm v9.9.0](https://pnpm.io/)

## Desenvolvimento

1. Coloque as variáveis de ambiente necessárias no arquivo [environment.development.ts](src/environments/environment.development.ts).

2. Execute o comando `pnpm install` para instalar as dependências.

3. Execute o comando `pnpm dev` para iniciar o servidor de desenvolvimento. Navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## Build

Execute o comando `pnpm build` para compilar o projeto. Os artefatos de construção serão armazenados no diretório `dist/`.

## Testes

Execute o comando `pnpm test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Executando testes end-to-end

Execute o comando `pnpm e2e` para executar os testes end-to-end via [Protractor](http://www.protractortest.org/).

## Escopo do projeto

- Ter uma única tela com um input de busca e um botão de submit
- Poder digitar um IP para buscar
- Ao buscar, fazer GET /check para trazer os dados do IP, fazer GET /reports para mostrar os da última semana, e fazer GET /blacklist para verificar se o IP buscado está na lista
- Abaixo do input, mostrar os dados do IP buscado, mostrar os reports como cards, se o IP está blacklisted e qual é a data e horário do último report (usar reduce)
