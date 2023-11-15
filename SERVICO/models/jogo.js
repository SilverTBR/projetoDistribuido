const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../BD/mysql")

const jogoModel = sequelize.define("Jogo", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desenvolvedora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distribuidora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subgenero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }, 
    comprado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

jogoModel.sync({ force: false })

module.exports = {
    jogoModel,
   
    buscarUpdateCompravel: async function (id) {
        try {
            const resultado = await jogoModel.findOne({where: {idUsuario: id, comprado: true},
                order: [['updatedAt', 'DESC']],
              });
            return { status: true, jogos: resultado }
        } catch (error) {
            console.error(error)
            return { status: false, error: error }
        }
    }
}