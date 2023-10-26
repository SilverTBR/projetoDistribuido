let graficoService = {

    qntAnalisePorJogos: async function(id, token){
        const data = {
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
        }
        let resposta = await fetch("http://localhost:3000/API/grafico/"+id, data)
        return await resposta.json()
    },
}
export default graficoService