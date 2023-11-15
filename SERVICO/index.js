const express = require("express")
const jogos = require("./models/jogo")

const app = express();

require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let idUser;
const usuarios = {};
let ultimoUpdate = {};

//Requerir e iniciar servidor Websocket
const WebSocketServer = require('ws');
 
const wss = new WebSocketServer.Server({ port: 8080 })
 
//Realiza isso quando um cliente conecta
wss.on("connection", ws => {
    console.log("Novo cliente conectado");

    //Se receber mensagem vai realizar esta arrow function
    ws.on('message', async (message) => {
        idUser = parseInt(message);
        usuarios[idUser] = ws;
        ultimoUpdate[idUser] = await jogos.buscarUpdateCompravel(idUser);
    });
 
    //Em 5 a 5 segundos vai verificar para cada cliente se a conexão estiver ok, se o ultimo update de coisa compravel é do cliente e tal
    setInterval(async () => {
        Object.keys(usuarios).forEach(async (idUser) => {
            const ws = usuarios[idUser];
            if (ws.readyState === WebSocketServer.OPEN) {
                let resultado = await jogos.buscarUpdateCompravel(parseInt(idUser));
                if(JSON.stringify(resultado) !== JSON.stringify(ultimoUpdate[idUser]) && resultado.jogos !== null){
                    ultimoUpdate[idUser] = resultado;
                    ws.send(JSON.stringify(resultado));
                }
            }
        });
    }, 5000);
 

    //Se perder conexão ou fecha
    ws.on("close", () => {
        console.log("Cliente conectado");
    });

    ws.onerror = function () {
        console.log("Deu xabu")
    }

});

console.log("Servidor está Websocket esta rodando 8080");

//Servidor Node.JS
app.listen(3001, () => {
    console.log("Rodando...");
})
