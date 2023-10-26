const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.server,process.env.user,process.env.senha, {host: "localhost", dialect: "mysql"})

sequelize.authenticate()
    .then(() => console.log("Conectado ao MySQL"))
    .catch(error => console.log("Erro ao conectar no BD: "+ error))

module.exports = sequelize