const {Sequelize ,DataTypes} = require("sequelize")
const sequelize = require("../BD/mysql")
const { jogoModel } = require("./jogo");
const { usuarioModel } = require("./usuario")

const analiseModel = sequelize.define("Analise", {
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idJogo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    texto: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

analiseModel.belongsTo(usuarioModel, {foreignKey: "idUsuario"});
analiseModel.belongsTo(jogoModel, {foreignKey: "idJogo"});

analiseModel.sync({force: false})

module.exports = {
    cadastrar: async function (id, idUsuario, texto){
        try{
            const resultado = await analiseModel.create({
                idJogo: id,
                idUsuario: idUsuario,
                texto: texto
            })
            return {status: true, analise: resultado}
        }catch(error){
            console.error(error)
            return {status: false, error: error}
        }
    },
    buscarPorJogo: async function(id){
        try{
            const resultado = await analiseModel.findAll({where: {idJogo: id}})
            return {status: true, analises: resultado}
        }catch(error){
            console.error(error)
            return {status: false, error: error}
        }
    },
    update: async function (id, texto){
        try{
            let numRowsAffected = await analiseModel.update({texto: texto}, {where: {id: id}})
            if(numRowsAffected[0]>0){
                return {status: true}
            }else{
                return {status: false, error: "0update"}
            }
        } catch(error) {
            console.error(error)
            return {status: false, error: error};
        }
    },
    deletar: async function(id){
        try{
            let qntDeletados = await analiseModel.destroy({where:{id: id}})
            if(qntDeletados == 1){
                return {status: true}
            }else{
                return {status: false, error: "0delete"}
            }
        }catch(error){
            console.error(error)
            return {status: false, error: error};
        }
    },

    deletarPorJogo: async function(id){
        try{
            let qntDeletados = await analiseModel.destroy({where:{idJogo: id}})
            if(qntDeletados >= 0){
                return {status: true}
            }else{
                return {status: false, error: "0delete"}
            }
        }catch(error){
            console.error(error)
            return {status: false, error: error};
        }
    },

    deletarTodos: async function(idUsuario){
        try{
            let qntDeletados = await analiseModel.destroy({where:{idUsuario: idUsuario}})
            if(qntDeletados >= 0){
                return {status: true}
            }else{
                return {status: false, error: "0deleteAnalise"}
            }
        }catch(error){
            console.log(error)
            return {status: false, error: error}
        }
    },

    qntAnalisePorJogos: async function (idUsuario) {
        try {
            let resultados = await analiseModel.findAll({
                attributes: [
                    'idJogo',
                    [sequelize.fn('count', sequelize.col('texto')), 'quantidadeTextos']
                ],
                include: [{
                    model: jogoModel,
                    attributes: ['nome']
                }],
                where:{
                    idUsuario: idUsuario
                },
                group: ['idJogo'],
                raw: true
            })


            return{status: true, dados: resultados}

        } catch (error) {
            console.error(error)
            return { status: false, error: error }
        }
    }

}
