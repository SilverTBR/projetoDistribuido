const express = require("express")
var main = express.Router();


main.get("/", (req, res) => {
    res.render("main")
})

main.get("/perfil", (req, res) => {
    res.render("perfil")
})

main.get("/jogos", (req, res) => {
    let jogo = null
    if(req.query.jogo){
        jogo = JSON.parse(req.query.jogo) 
    }
    res.render("jogos", {jogo: jogo})
})

main.get("/analise", (req, res) => {
    let analise = null
    if(req.query.analise){
        analise = JSON.parse(req.query.analise)
    }
    res.render("analise", { analise: analise})
})

main.get("/grafico", (req, res) => {
    res.render("graph")
})


module.exports = main;