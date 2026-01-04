# SISTEMA DE GESTÃO DE ORDEM DE SERVIÇO
Este projeto é um sistema backend para gerenciamento de ordens de serviço, desenvolvido com Node.js, Express, Sequelize e MySQL.  
O objetivo é controlar clientes, usuários, técnicos, materiais, pagamentos e o ciclo completo de uma ordem de serviço.

# 1. Derruba tudo e apaga os volumes (CUIDADO: isso apaga os dados do banco)
docker-compose down -v

# 2. Sobe novamente forçando o rebuild da imagem da API
docker-compose up --build