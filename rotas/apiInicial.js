const express = require("express")
const mailer = require("../nodeMailer/mailer")
const usuario = require("../models/usuario")
const jogos = require("../models/jogo")
const analise = require("../models/analise")
var rotaAPI = express.Router();
const { loginSchema, cadastroSchema } = require("../helpers/validador.js");


rotaAPI.post("/mailer", async (req, res) => {
    let {email, nome, mensagem, assunto} = req.body
    let resultado = await mailer.enviarEmail(email, nome, mensagem, assunto)
    res.json(resultado)
})

rotaAPI.post("/cadastrar", async (req, res) => {
    const {error, value } = cadastroSchema.validate(req.body)
    if(error){
        return res.json({status: false, error: "campos invalidos"})
    }
    let {nome ,email, senha} = value
    let resultado = await usuario.cadastrar(nome, email, senha);
    res.json(resultado)
    
})

rotaAPI.post("/logar", async (req, res) => {
    const {error, value } = loginSchema.validate(req.body)
    if(error){
        return res.json({status: false, error: "email ou senha invalidos"})
    }
    let {email, senha} = value
    let resultado = await usuario.logar(email, senha);
    res.json(resultado)
})

//Listar todos os jogos
rotaAPI.get("/:order", async (req, res) => {
    let { order } = req.params
    let resultado = await jogos.listarTodos(order)
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

module.exports = rotaAPI;