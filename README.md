# AbuseIP Angular

## Ideias

- Ter uma única tela com um input de busca e um botão de submit
- Poder digitar um IP para buscar
- Ao buscar, fazer GET /check para trazer os dados do IP, fazer GET /reports para mostrar os da última semana, e fazer GET /blacklist para verificar se o IP buscado está na lista
- Abaixo do input, mostrar os dados do IP buscado, mostrar os reports como cards, se o IP está blacklisted e qual é a data e horário do último report (usar reduce)
