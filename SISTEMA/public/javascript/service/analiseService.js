let analiseService = {
    cadastrar: async function(id, texto, idUsuario, token){
        console.log(texto)
        const data = {
            method: "POST",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
            body: JSON.stringify({texto: texto, idUsuario: idUsuario})            
        }
        let resposta = await fetch("http://localhost:3000/API/analise/"+id, data)
        return await resposta.json()
    },

    buscaPorJogo: async function(id, token){
        const data = {
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
        }
        let resposta = await fetch("http://localhost:3000/API/analise/"+id, data)
        return await resposta.json()
    },

    editar: async function(id, texto, token){
        const data = {
            method: "PUT",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
            body: JSON.stringify({texto: texto})            
        }
        let resposta = await fetch("http://localhost:3000/API/analise/"+id, data)
        return await resposta.json()
    },

    deletar: async function(id, token){
        const data = {
            method: "DELETE",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
        }
        let resposta = await fetch("http://localhost:3000/API/analise/"+id, data)
        return await resposta.json()
    },

}
export default analiseService