let jogoService = {
    cadastrar: async function(id, nome, desenvolvedora, distribuidora, genero, subgenero, preco, token){
        const data = {
            method: "POST",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
            body: JSON.stringify({nome: nome, desenvolvedora: desenvolvedora, distribuidora: distribuidora, genero: genero, subgenero: subgenero, preco: preco})            
        }
        let resposta = await fetch("http://localhost:3000/API/jogo/"+id, data)
        return await resposta.json()
    },

    buscaPorUser: async function(id, order, token){
        const data = {
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
        }
        let resposta = await fetch("http://localhost:3000/API/"+id+"/"+order, data)
        return await resposta.json()
    },

    buscarTodos: async function(order){
        const data = {
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "},
        }
        let resposta = await fetch("http://localhost:3000/acesso/"+order, data)
        console.log(resposta);
        return await resposta.json()
    },

    editar: async function(id, nome, desenvolvedora, distribuidora, genero, subgenero, preco, token){
        const data = {
            method: "PUT",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
            body: JSON.stringify({nome: nome, desenvolvedora: desenvolvedora, distribuidora: distribuidora, genero: genero, subgenero: subgenero, preco: preco})            
        }
        let resposta = await fetch("http://localhost:3000/API/jogo/"+id, data)
        return await resposta.json()
    },

    deletar: async function(id, token){
        const data = {
            method: "DELETE",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
        }
        let resposta = await fetch("http://localhost:3000/API/jogo/"+id, data)
        return await resposta.json()
    },

    comprar: async function(id){
        // comprar
        const data = {
            method: "DELETE",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "},
        }
        let resposta = await fetch("http://localhost:3000/acesso/jogo/"+id, data)
        return await resposta.json()
    },
}
export default jogoService