
let perfilService = {
    update: async function(id, nome, senha, token){
        const data = {
            method: "PUT",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
            body: JSON.stringify({nome: nome, senha: senha})            
        }
        let resposta = await fetch("http://localhost:3000/API/"+id, data)
        return await resposta.json()
    },
    delete: async function(id, token){
        const data = {
            method: "DELETE",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token}         
        }
        let resposta = await fetch("http://localhost:3000/API/"+id, data)
        return await resposta.json()
    }
}
export default perfilService