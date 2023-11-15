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
```docker
docker network create redegamelog
```
</pre>

OBS: redegamelog é o nome dado pela rede e pode ser substituido por qualquer outro nome.

Se der certo é para aparecer a seguinte resposta:
![rede](https://github.com/SilverTBR/projetoDistribuido/assets/111712600/e74f69ff-0b8a-4a25-82e4-2df15c886dfe)




