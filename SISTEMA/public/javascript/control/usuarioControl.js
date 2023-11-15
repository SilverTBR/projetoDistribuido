import usuarioService from "../service/usuarioService.js";

window.onload = () => {
    sessionStorage.clear();

    const getNome = () => {
        return document.getElementById("nome").value
    }

    const getEmail = () => {
        return document.getElementById("email").value
    }

    const getsenha = () => {
        return document.getElementById("senha").value
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const confirmarSenha = () => {
        if (getsenha() === document.getElementById("cSenha").value) {
            return true;
        }
        return false;
    }

    const verificarCamposC = () => {
        if (emailRegex.test(getEmail()) && getNome().trim().length >= 3 && getsenha().trim().length >= 3) {
            return true
        }
        return false
    }

    const verificarCamposL = () => {
        if (emailRegex.test(getEmail()) && getsenha().trim().length >= 3) {
            return true
        }
        return false
    }

    const definirAviso = (error) => {
        console.log(error)
        if (error.name == "SequelizeUniqueConstraintError") {
            document.getElementById("aviso-text").innerHTML = "Email já cadastrado! Por favor digite um email unico!"
        } else if (error === "SemPermissao") {
            document.getElementById("aviso-text").innerHTML = "Acesso negado! Você não tem permissão para acessar esta página.";
        } else if(error ===  "0resultado"){
            document.getElementById("aviso-text").innerHTML = "Email ou senha estão incorretos!";
        } else{
            document.getElementById("aviso-text").innerHTML = "Acesso negado! Erro no banco de dados";
        } 
        document.getElementById("aviso").style.display = "flex"
    }

    const cadastrar = async () => {
        if (verificarCamposC() && confirmarSenha()) {
            let resultado = await usuarioService.cadastrar(getNome(), getEmail(), getsenha());
            console.log(resultado)
            if (!resultado.status) {
                definirAviso(resultado.error);
            } else {
                sessionStorage.setItem("token", resultado.token);
                sessionStorage.setItem("usuario", JSON.stringify(resultado.usuario))
                window.location.href = "http://localhost:3000/main";
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    const logar = async () => {
        if (verificarCamposL()) {
            let resultado = await usuarioService.login(getEmail(), getsenha());
            if (!resultado.status) {
                definirAviso(resultado.error)
            } else {
                sessionStorage.setItem("token", resultado.token);
                sessionStorage.setItem("usuario", JSON.stringify(resultado.usuario))
                window.location.href = "http://localhost:3000/main";
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');

    if (errorParam) {
        definirAviso(errorParam);
    }

    const logarButton = document.getElementById("Logar");
    if (logarButton) {
        logarButton.addEventListener("click", logar);
    }

    const cadastrarButton = document.getElementById("cadastrar");
    if (cadastrarButton) {
        cadastrarButton.addEventListener("click", cadastrar);
    }


}