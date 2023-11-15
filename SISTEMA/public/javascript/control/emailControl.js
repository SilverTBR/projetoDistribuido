import emailService from "../service/emailService.js"

window.onload = () => {
    if(sessionStorage.getItem("token")){
        document.getElementsByClassName("header-logo")[0].href = "/main"
    }

    const getEmail = () => {
        return document.getElementById("email").value
    }

    const getNome = () => {
        return document.getElementById("nome").value
    }

    const getMensagem = () => {
        return document.getElementById("mensagem").value
    }

    const getAssunto = () => {
        return document.getElementById("assunto").value
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const buttonSucesso = () => {
        document.getElementById("enviar").style.backgroundColor = "#d4edda"
        document.getElementById("enviar").style.borderColor = "#c3e6cb"
        document.getElementById("enviar").style.color = "#155724"
        document.getElementById("enviar").style.cursor = "default"
        document.getElementById("enviar").innerHTML = "Email enviado!" 
        document.getElementById("enviar").disabled = true;
        document.getElementById("aviso").style.display = "none"
    }

    const enviarEmail = async () => {
        if(emailRegex.test(getEmail()) && getNome().trim() != "" && getMensagem().trim() != "" && getAssunto().trim() != ""){
            let resposta = await emailService.enviar(getEmail(), getNome(), getMensagem(), getAssunto());
            if(resposta.accepted){
                buttonSucesso()
            }else{
                document.getElementById("aviso").style.display = "flex"
            }
        }else{
            document.getElementById("aviso").style.display = "flex"
        }
    }

    document.getElementById("enviar").addEventListener("click",enviarEmail)
}