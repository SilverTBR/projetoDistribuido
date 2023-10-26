const {Sequelize ,DataTypes} = require("sequelize")
const sequelize = require("../BD/mysql")
const jwt = require("jsonwebtoken");

const usuarioModel = sequelize.define("Usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

usuarioModel.sync({force: false})



module.exports = {
    usuarioModel,
    cadastrar: async function (nome, email, senha) {
        try{
        const resultado = await usuarioModel.create({
            nome: nome,
            email: email,
            senha: senha
        })
        const token = jwt.sign({usuario:resultado.dataValues}, process.env.jwtChave, {
            expiresIn: "1h"
        })
        return {status: true, token: token, usuario: resultado.dataValues}
        }catch(error){
            console.error(error)
            return {status: false, error: error}
        }
    },

    logar: async function(email, senha){
        try{
        const resultado = await usuarioModel.findOne({where: {email: email, senha: senha}})
        if(resultado === null){
            return {status: false, error: "0resultado"}
        }
        const token = jwt.sign({usuario:resultado.dataValues}, process.env.jwtChave, {
            expiresIn: "1h"
        })
        return {status: true, token: token, usuario: resultado.dataValues}
        }catch(error){
            console.error(error)
            return {status: false, error: error}
        }
    },

    update: async function (id, dados) {
        try{
            let numRowsAffected = await usuarioModel.update({nome: dados.nome, senha: dados.senha}, {where: {id: id}})
            if(numRowsAffected[0]>0){
                return {status: true}
            }else{
                return {status: false, error: "0update"}
            }
        } catch(error) {
            console.error(error)
            return {status: false, error: error}
        }
    },

    buscarPorPk: async function(id) {
        try{
            const resultado = await usuarioModel.findOne({where: {id: id}})
            if(resultado === null){
                return {status: false, error: "0user"}
            }
            const token = jwt.sign({usuario:resultado.dataValues}, process.env.jwtChave, {
                expiresIn: "1h"
            })
            return {status: true, token: token, usuario: resultado.dataValues}
            }catch(error){
                console.error(error)
                return {status: false, error: error}
            }
    },

    deletar: async function(id){
        try{
            let qntDeletados = await usuarioModel.destroy({where:{id: id}})
            if(qntDeletados == 1){
                return {status: true}
            }else{
                return {status: false, error: "0delete"}
            }
        }catch(error){
            console.error(error)
            return {status: false, error: error}
        }
    }


}