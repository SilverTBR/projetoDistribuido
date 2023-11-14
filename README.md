# DOCKER INSTALAÇÃO PLATAFORMA E SOFTWARE

# Introdução:
O sistema abordado foi criado para rastreamento de pedidos de livros mas foi alterado para jogos. O que levou essas mudanças foram: (i) abordar uma área de interesse, (ii) uma base de jogos já feita. Dessa forma, esse texto visa demonstrar em um passo a passo, orientações necessárias para realizar a instalação do sistema proposto e executar o mesmo no Docker.

# Passo 1: Instalar o Docker.

Primeiro, é necessário ter instalado no sistema, o Docker Desktop ou apenas o de linha de comando. Para baixar acesse: https://www.docker.com/products/docker-desktop/

# Passo 2: Baixar o sistema.

Clone esse repositório ou baixe seus arquivos diretamente. Para realizar um clone do projeto basta ter o git na máquina e rodar o seguinte comando:

git clone https://github.com/SilverTBR/projetoDistribuido

Esse repositório baixado contará com duas pastas, uma com o nome SERVICO e outro com o nome SISTEMA. A pasta SERVICO contém a parte de rastreamento de pedidos, e o SISTEMA contém o sistema de vendas desenvolvido.

# Passo 3: Configurar as imagens no DOCKER.

Essa etapa consiste em configurar tudo o que é necessário para configurar o sistema e o serviço com o DOCKER e rodá-lo através dele. A aplicação em questão se comunica com um banco de dados SQL, dessa forma, é necessário no docker, também rodar uma imagem do SQL, nesse escopo, foi escolhido o MYSQL, banco SGBD utilizado tanto no serviço quando no sistema.

Primeiramente, crie um docker network, esse network será responsável para fazer o banco, o sistema e o serviço conversarem entre si.

# PASSO 3.1: Configurando o BANCO DE DADOS.



