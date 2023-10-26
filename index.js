const express = require("express")
const path = require('path');
const session = require("express-session")
const jwt = require('jsonwebtoken')
var mustacheExpress = require("mustache-express");

const app = express();
var engine = mustacheExpress();

require("dotenv").config()
app.engine("mustache", engine);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "view"));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "mustache");

const inicial = require("./rotas/paginas")
const apiI = require("./rotas/apiInicial")
const main = require("./rotas/main")
const API = require("./rotas/api")
const gerador = require("./rotas/gerador")

app.use(session({
  secret:process.env.sessionChave,
  resave: false,
  saveUninitialized: false
}))


let controlaAcesso = function (req, res, next) {
    let token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, process.env.jwtChave, (err, decoded) => {
      if (err) {
        res.redirect("/?error=SemPermissao")
      } else {
        req.usuario = decoded.usuario
        return next()
      }
    })
  }


app.use("/", inicial);
app.use("/acesso", apiI);
app.use("/main", main);
app.use("/API", controlaAcesso, API)
app.use("/gerador", gerador)





app.listen(3000, () => {
    console.log("Rodando...");
})