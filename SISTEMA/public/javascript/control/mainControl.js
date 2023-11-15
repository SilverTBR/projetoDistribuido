import jogoService from "../service/jogoService.js"

window.onload = () => {
    if(!sessionStorage.getItem("token")){
        window.location.href = "/?error=SemPermissao";
    }
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    document.getElementById("perfil").innerHTML += usuario.nome
    
    let paginas = []
    let qntPgs = 0;
    const mainGrid = document.getElementById("grid");
    const divPags = document.getElementById("div-pags");


    const gerarCard = (jogo) => {
        const card = document.createElement("article")

        const tituloCard = document.createElement("h1");
        tituloCard.innerHTML = jogo.nome
        card.append(tituloCard)

        const generoP = document.createElement("p");
        generoP.innerHTML = jogo.genero + " - " + jogo.subgenero;
        card.append(generoP);

        const imageCard = document.createElement("img")
        imageCard.src = "/img/noImage.png"
        imageCard.classList.add("image-card")
        card.append(imageCard)

        const dev = document.createElement("p");
        dev.classList.add("dev-dist")
        dev.innerHTML = jogo.desenvolvedora;
        card.append(dev)

        const distri = document.createElement("small");
        distri.classList.add("dev-dist")
        distri.innerHTML = jogo.distribuidora;
        card.append(distri)

        //incerto se deveria fazer assim passando jogo como query ou qual outra forma seria melhor
        card.addEventListener("click", () => {
            window.location.href = "/main/jogos?jogo="+ JSON.stringify(jogo)
        })

        return card
    }

    const carregarCards = (jogos) => {
        mainGrid.innerHTML = ""
        jogos.forEach((jogo) => {
            mainGrid.appendChild(gerarCard(jogo))
        })
    } 

    const gerarPag = (paginas) => {
        qntPgs++;
        const pag = document.createElement("div");
        
        const numPg = document.createElement("p");
        numPg.innerHTML = qntPgs;
        pag.appendChild(numPg);

        pag.addEventListener("click", () => {
            carregarCards(paginas)
        })

        return pag;
    }

    const gerarJogos = async (order) => {
        let resultado = await jogoService.buscaPorUser(usuario.id, order, sessionStorage.getItem("token"))
        if(!resultado.status){
            window.location.href = "/?error=SemPermissao";
        }
        paginas = []
        divPags.innerHTML = ""
        qntPgs = 0
        
        while(resultado.jogos.length > 0){
            paginas.push(resultado.jogos.splice(0, 8))            
        }

        paginas.forEach((pagina) => {
           divPags.appendChild(gerarPag(pagina))
        })
        
        if (paginas.length > 0) {
            carregarCards(paginas[0])
        }
    }    
    gerarJogos("nome")

    document.getElementById("order-nome").addEventListener("click",() => gerarJogos("nome"));
    document.getElementById("order-dev").addEventListener("click", () => gerarJogos("desenvolvedora"));
    document.getElementById("order-gen").addEventListener("click", () => gerarJogos("genero"));

    
}