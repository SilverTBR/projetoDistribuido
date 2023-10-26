import jogoService from "../service/jogoService.js"

window.onload = () => {
    if(!sessionStorage.getItem("token")){
        window.location.href = "/?error=SemPermissao";
    }
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    document.getElementById("perfil").innerHTML += usuario.nome

    const getNome = () => {
        return document.getElementById("nome").value
    }

    const getGenero = () => {
        return document.getElementById("genero").value
    }

    const getSubgenero = () => {
        return document.getElementById("subgenero").value
    }

    const getDesenvolvedora = () => {
        return document.getElementById("desenvolvedora").value
    }

    const getDistribuidora = () => {
        return document.getElementById("distribuidora").value
    }

    const getPreco = () => {
        return document.getElementById("preco").value
    }

    const verificarCampos = () => {
        const nome = getNome().trim();
        const genero = getGenero().trim();
        const subgenero = getSubgenero().trim();
        const desenvolvedora = getDesenvolvedora().trim();
        const distribuidora = getDistribuidora().trim();
        const preco = getPreco().trim();
    
        if (nome.length >= 3 && genero.length >= 3 && subgenero.length >= 3 && desenvolvedora.length >= 3 && distribuidora.length >= 3 && preco.length>0) {
            return true;
        }
        return false;
    };
    
    const chamarCadastro = async () => {
        if(verificarCampos()){
            let resultado = await jogoService.cadastrar(usuario.id, getNome(), getDesenvolvedora(), getDistribuidora(), getGenero(), getSubgenero(), getPreco(), sessionStorage.getItem("token"));
            console.log(resultado)
            if(resultado.status){
                window.location.href = "/main";
            }else{
                document.getElementById("aviso").style.display = "flex"
            }
        }else{
            document.getElementById("aviso").style.display = "flex"
        }
    }



    document.getElementById("cadastrar").addEventListener("click", chamarCadastro)

}