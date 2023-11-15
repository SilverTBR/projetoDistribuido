const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../BD/mysql")
const { usuarioModel } = require("./usuario");

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

jogoModel.belongsTo(usuarioModel, { foreignKey: "idUsuario" });

jogoModel.sync({ force: false })

module.exports = {
    jogoModel,
    cadastrar: async function (dados, id) {
        try {
            const resultado = await jogoModel.create({
                idUsuario: id,
                nome: dados.nome,
                desenvolvedora: dados.desenvolvedora,
                distribuidora: dados.distribuidora,
                genero: dados.genero,
                subgenero: dados.subgenero,
                preco: dados.preco,
                comprado: false
            })
            return { status: true, jogo: resultado }
        } catch (error) {
            console.error(error)
            return { status: false, error: error };
        }
    },
    buscarPorUser: async function (id, ordem) {
        try {
            const resultado = await jogoModel.findAll({ where: { idUsuario: id }, order: [[ordem, "ASC"]] })
            return { status: true, jogos: resultado }
        } catch (error) {
            console.error(error)
            return { status: false, error: error }
        }
    },

    listarTodos: async function(ordem){
        try{
            console.log("Teste");
            const resultado = await jogoModel.findAll({ order: [[ordem, "ASC"]]})
            return { status: true, jogos: resultado }
        } catch (error) {
            console.error(error)
            return {status: false, error: error }
        }
    },

    update: async function (id, dados) {
        try {
            let numRowsAffected = await jogoModel.update({ nome: dados.nome, desenvolvedora: dados.desenvolvedora, distribuidora: dados.distribuidora, genero: dados.genero, subgenero: dados.subgenero, preco: dados.preco }, { where: { id: id } })
            if (numRowsAffected[0] > 0) {
                return { status: true }
            } else {
                console.log("aqui")
                return { status: false, error: "0update" }
            }
        } catch (error) {
            console.error(error)
            return { status: false, error: error };
        }
    },
    deletar: async function (id) {
        try {
            let qntDeletados = await jogoModel.destroy({ where: { id: id } })
            if (qntDeletados == 1) {
                return { status: true }
            } else {
                return { status: false, error: "0delete" }
            }
        } catch (error) {
            console.error(error)
            return { status: false, error: error }
        }
    },

    deletarTodos: async function (idUsuario) {
        try {
            let qntDeletados = await jogoModel.destroy({ where: { idUsuario: idUsuario } })
            if (qntDeletados >= 0) {
                return { status: true }
            } else {
                return { status: false, error: "0deleteJogo" }
            }
        } catch (error) {
            console.error(error)
            return { status: false, error: error }
        }


    },

    comprar: async function (id) {
        try {
            let numRowsAffected = await jogoModel.update({ comprado: true }, { where: { id: id } })
            if (numRowsAffected[0] > 0) {
                return { status: true }
            } else {
                return { status: false, error: "0update" }
            }
        } catch (error) {
            console.error(error)
            return { status: false, error: error };
        }
    },
    listarNComprados: async function(ordem){
        try{
            const resultado = await jogoModel.findAll({ where: { comprado: false }, order: [[ordem, "ASC"]] })
            return { status: true, jogos: resultado }
        } catch (error) {
            console.error(error)
            return {status: false, error: error }
        }
    },

}
