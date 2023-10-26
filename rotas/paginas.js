const express = require("express")
var inicial = express.Router();

inicial.get("/", (req, res) => {
    res.render("index")
})

inicial.get("/login", (req, res) => {
    res.render("login")
})

inicial.get("/sobre", (req, res) => {
    res.render("sobre")
})

inicial.get("/cadastro", (req, res) => {
    res.render("cadastrar")
})


module.exports = inicial;