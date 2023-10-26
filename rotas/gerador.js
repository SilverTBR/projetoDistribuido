const express = require("express");
const usuario = require("../models/usuario");
const jogos = require("../models/jogo");
const analise = require("../models/analise");

var rota = express.Router();

rota.get("/", async (req, res) => {
  try {
    for (let i = 0; i < 5; i++) {
      let resultadoUsuario = await usuario.cadastrar(
        "usuario" + (i + 1),
        "usuario" + (i + 1) + "@gmail.com",
        "123456"
      );
      let idUsuario = resultadoUsuario.usuario.id;

      // Cadastrar 5 jogos para cada usuário
      for (let j = 0; j < 5; j++) {
        let resultadoJogo = await jogos.cadastrar(
          {
            nome: "jogo " + (j + 1),
            desenvolvedora: "Desenvolvedora " + (j + 1),
            distribuidora: "Distribuidora " + (j + 1),
            genero: "genero " + (j + 1),
            subgenero: "Subgenero " + (j + 1),
            preco: (j+1)
          },
          idUsuario
        );

        let idJogo = resultadoJogo.jogo.id;

        // Cadastrar 5 análises para cada jogo
        for (let k = 0; k < 5; k++) {
          let resultadoAnalise = await analise.cadastrar(
            idJogo,
            idUsuario,
            "Análise " + (k + 1) + " do jogo " + (j + 1)
          );
        }
      }
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar os dados.");
  }
});

module.exports = rota;
