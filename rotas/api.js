const express = require("express")
const usuario = require("../models/usuario")
const jogos = require("../models/jogo")
const analise = require("../models/analise")
var rotaAPI = express.Router();
const JOI = require("joi")
const { edicaoSchema, jogosSchema } = require("../helpers/validador.js");

/*APIs de usuario*/
//Editar usuario
rotaAPI.put("/:id", async (req, res) => {
    const {error, value } = edicaoSchema.validate(req.body)
    if(error){
        return res.json({status: false, error: "camposInvalidos"})
    }
    let { id } = req.params
    let resultado = await usuario.update(id, value)
    if (resultado.status) {
        resultado = await usuario.buscarPorPk(id)
    } 
    res.json(resultado)
})

//deletar usuario
rotaAPI.delete("/:id", async (req, res) => {
    let { id } = req.params
    let resultado = null;
    resultado = await analise.deletarTodos(id);
    if(resultado.status){
        resultado = await jogos.deletarTodos(id);
        if(resultado.status){
            resultado = await usuario.deletar(id)
        }
    }
    //Deveria tentar por um rollback quando tiver tempo
    res.json(resultado)
})

/*APIs de analise*/
//Cadastrar analise
rotaAPI.post("/analise/:id", async (req, res) => {
    const {error, value } = JOI.string().min(10).required().validate(req.body.texto)
    if(error){
        console.log(error)
        return res.json({status: false, error: "analiseInvalida"})
    }
    let { id } = req.params
    let resultado = await analise.cadastrar(id, req.body.idUsuario, value)
    res.json(resultado)
})

//Buscar analise por ID do jogo
rotaAPI.get("/analise/:id", async (req, res) => {
    let { id } = req.params
    console.log(id)
    let resultado = await analise.buscarPorJogo(id)
    res.json(resultado)
})

//Deletar a analise a partir da id da analise
rotaAPI.delete("/analise/:id", async (req, res) => {
    let { id } = req.params
    let resultado = await analise.deletar(id)
    res.json(resultado)

})

//Editar analise pelo id da analise
rotaAPI.put("/analise/:id", async (req, res) => {
    const {error, value } = JOI.string().min(10).required().validate(req.body.texto)
    if(error){
        console.log(error)
        return res.json({status: false, error: "analiseInvalida"})
    }
    let { id } = req.params
    let resultado = await analise.update(id, value)
    res.json(resultado)
})

rotaAPI.get("/grafico/:id", async (req, res) => {
    let { id } = req.params
    let resultado = await analise.qntAnalisePorJogos(id)
    res.json(resultado)
})

/*APIs de jogos*/
//cadastrar jogo
rotaAPI.post("/jogo/:id", async (req, res) => {
    const {error, value } = jogosSchema.validate(req.body)
    if(error){
        return res.json({status: false, error: "camposInvalidos"})
    }
    let { id } = req.params
    let resultado = await jogos.cadastrar(value, id)
    res.json(resultado)
})

//buscar por jogo pelo id
rotaAPI.get("/:id/:order", async (req, res) => {
    let { id, order } = req.params
    let resultado = await jogos.buscarPorUser(id, order)
    res.json(resultado)
})

//deletar jogo por id
rotaAPI.delete("/jogo/:id", async (req, res) => {
    let resultado = null
    let { id } = req.params
    resultado = await analise.deletarPorJogo(id)
    if(resultado.status){
        resultado = await jogos.deletar(id)
    }
    res.json(resultado)
})

//Editar jogos pelo id do jogo
rotaAPI.put("/jogo/:id", async (req, res) => {
    const {error, value } = jogosSchema.validate(req.body)
    if(error){
        console.log(error)
        return res.json({status: false, error: "camposInvalidos"})
    }
    let { id } = req.params
    let resultado = await jogos.update(id, value)
    res.json(resultado)
})




module.exports = rotaAPI;