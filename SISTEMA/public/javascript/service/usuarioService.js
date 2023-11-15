
let usuarioService = {
    login: async function(email, senha){
        const data = {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email: email, senha: senha})            
        }
        let resposta = await fetch("http://localhost:3000/acesso/logar", data)
        return await resposta.json()
    },

    cadastrar: async function(nome ,email, senha){
        const data = {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nome: nome, email: email, senha: senha})            
        }
        let resposta = await fetch("http://localhost:3000/acesso/cadastrar", data) 
        return await resposta.json()
    }

}
export default usuarioService