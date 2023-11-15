# DOCKER INSTALAÇÃO PLATAFORMA E SOFTWARE

# Introdução:
O sistema abordado foi criado para rastreamento de pedidos de livros mas foi alterado para jogos. O que levou essas mudanças foram: (i) abordar uma área de interesse, (ii) uma base de jogos já feita. Dessa forma, esse texto visa demonstrar em um passo a passo, orientações necessárias para realizar a instalação do sistema proposto e executar o mesmo no Docker.

# Passo 1: Instalar o Docker.

Primeiro, é necessário ter instalado no sistema, o Docker Desktop ou apenas o de linha de comando. Para baixar acesse: https://www.docker.com/products/docker-desktop/

# Passo 2: Baixar o sistema.

Clone esse repositório ou baixe seus arquivos diretamente. Para realizar um clone do projeto basta ter o git na máquina e rodar o seguinte comando:

git clone https://github.com/SilverTBR/projetoDistribuido

Esse repositório baixado contará com duas pastas, uma com o nome SERVICO e outro com o nome SISTEMA. A pasta SERVICO contém a parte de rastreamento de pedidos, e o SISTEMA contém o sistema de vendas desenvolvido.

Após o clone ou download, é para a pastar estar parecida com isso:

![pastas](https://github.com/SilverTBR/projetoDistribuido/assets/111712600/6cfe56f9-8134-43ef-b482-cc83eedde16d)

# Passo 3: Configurar as imagens no DOCKER.

Essa etapa consiste em configurar o ambiente desenvolvido com o docker, e assim, realizar a comunicação entre eles. Para isso, é necessário criar uma imagem e container do SISTEMA, SERVICO e do Banco de Dados escolhido. Para realizar a comunicação entre as três plataformas, é necessário utilizar do Docker Network.

# PASSO 3.1: CRIE O DOCKER NETWORK.

Primeiramente é ncessário criar uma rede docker para realizar a comunicação de cada parte do sistema. Para isso, rode o seguinte comando, abrindo o terminal da pasta com os projetos:

<pre>
docker network create redegamelog
</pre>


# PASSO 3.2: CRIE O CONTAINER DO MYSQL.
Nesse projeto, foi utilizado o MySQL para o banco de dados, o comando abaixo está configurando para criar um banco de dados com o nome "web2" e a senha "123456". A Porta está configuranda na 3306, caso aja conflitos de portas, pode ser alterado para outra porta. Para isso, é necessário alterar o port no código.

<pre>
docker run -d --name mysql-container  --network redegamelog -e  MYSQL_DATABASE=web2 -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 mysql:latest
</pre>

![banco](https://github.com/SilverTBR/projetoDistribuido/assets/111712600/97d8bb04-4e00-4f83-8232-5256d71cb82f)

# PASSO 3.3: CRIE O CONTAINER DO SISTEMA.

Clique com o botão direito na pasta SISTEMA e abra o terminal, ou use cd SISTEMA. Após isso, execute o seguinte comando:

<pre>
 docker build -t sistemagamelog .
</pre>

![sistema a](https://github.com/SilverTBR/projetoDistribuido/assets/111712600/7174157e-96eb-49ed-a136-e11ce9fe9f47)

Isso irá buildar o dockerfile que o sistema possui. Após ele terminar de realizar a criação da imagens, iremos criar um container na rede docker:

<pre>
 docker run -d --name sistema-container --network redegamelog -p 3000:3000 sistemagamelog
</pre>

# PASSO 3.4: CRIE O CONTAINER DO SERVIÇO.

Clique com o botão direito na pasta SERVICO e abra no terminal, ou use cd .. e depois cd SERVICO. Após isso, execute o seguinte comando:

<pre>
 docker build -t servicogamelog .
</pre>

Isso irá buildar o dockerfile que o sistema possui. Após ele terminar de realizar a criação da imagens, iremos criar um container na rede docker:

<pre>
 docker run -d --name servico-container --network redegamelog -p 8080:8080 servicogamelog
</pre>

# PASSO 4: ENTRAR NO SISTEMA.

Caso não tenha dado nenhum problema, abra o navegador pelo localhost mesmo:

http://localhost:3000/

![sistema ab](https://github.com/SilverTBR/projetoDistribuido/assets/111712600/fa74f489-a487-41c5-a5e9-f3d4ba12ab70)











