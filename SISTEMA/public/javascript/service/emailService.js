let emailService = {
    enviar: async function(email, nome, mensagem, assunto) {
        const data = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email: email, nome: nome, mensagem: mensagem, assunto: assunto})
        }
        const resultado = await fetch("http://localhost:3000/acesso/mailer",data)
        return await resultado.json()
    }
}

export default emailService