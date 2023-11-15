import analiseService from "../service/analiseService.js"

window.onload = () => {
    if(!sessionStorage.getItem("token")){
        window.location.href = "/?error=SemPermissao";
    }
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    document.getElementById("perfil").innerHTML += usuario.nome

    const getID = () => {
        return document.getElementById("id").value
    }

    const getAnalise = () => {
        return document.getElementById("analise").value
    }

    const validarCampos = () => {
        if(getID() != "" && getAnalise().trim().length >= 10){
            return true
        }
        return false
    }

    const chamarExcluir = async () => {
        let resultado = await analiseService.deletar(getID(), sessionStorage.getItem("token"))
        if (resultado.status) {
            window.location.href = "/main";
        } else {
            sessionStorage.clear()
            window.location.href = "/?error=SemPermissao"
        }

    }

        const chamarEditar = async () => {
        if (validarCampos()) {
            let resultado = await analiseService.editar(getID(), getAnalise(), sessionStorage.getItem("token"))
            if (resultado.status) {
                window.location.href = "/main"
            } else {
                document.getElementById("aviso").style.display = "flex"
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    document.getElementById("salvar").addEventListener("click", chamarEditar)
    document.getElementById("excluir").addEventListener("click", chamarExcluir)

}