import perfilService from "../service/perfilService.js"
let alterouSenha = false;
window.onload = () => {
    if(!sessionStorage.getItem("token")){
        window.location.href = "/?error=SemPermissao";
    }
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    document.getElementById("perfil").innerHTML += usuario.nome
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("senha").value = usuario.senha;
    document.getElementById("email").value = usuario.email;

    const getNome = () => {
        return document.getElementById("nome").value
    }

    const getSenha = () => {
        return document.getElementById("senha").value
    }

    const getcSenha = () => {
        if(alterouSenha){
            return document.getElementById("cSenha").value
        }
        return document.getElementById("senha").value
    }

    const validarSenha = () => {
        if (getSenha() === getcSenha()) {
            return true
        }
        return false;
    }

    const validarCampos = () => {
        if (getNome().trim().length >= 3 && getSenha().trim().length >= 3) {
            return true
        }
        return false
    }
    
    const chamarUpdate = async () => {
        if (validarCampos() && validarSenha()) {
            let resultado = await perfilService.update(usuario.id, getNome(), getSenha(), sessionStorage.getItem("token"));
            if (!resultado.status) {
                if(resultado.error === "camposInvalidos"){
                    document.getElementById("aviso").style.display = "flex"
                }else{
                    window.location.href = "/?error=SemPermissao";
                }
            } else {
                sessionStorage.setItem("token", resultado.token);
                sessionStorage.setItem("usuario", JSON.stringify(resultado.usuario))
                window.location.href = "/main";
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    const chamarDelete = async () => {
        let resultado = await perfilService.delete(usuario.id, sessionStorage.getItem("token"));
        if (resultado.status) {
            window.location.href = "http://localhost:3000/"
        }else{
            window.location.href = "/?error=SemPermissao";
        }

    }

    const habilitarSenha = () => {
        alterouSenha = true;
        const cSenha = document.getElementById("cSenha")
        cSenha.removeAttribute("disabled")
        cSenha.classList.remove("disabled-input")
    }

    document.getElementById("senha").addEventListener("input", habilitarSenha)
    document.getElementById("salvar").addEventListener("click", chamarUpdate)
    document.getElementById("excluir").addEventListener("click", chamarDelete)

}