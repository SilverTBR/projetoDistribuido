const JOI = require("joi")

const loginSchema = JOI.object({
    email: JOI.string().email({tlds: {allow: true}}).required(),
    senha: JOI.string().min(3).required()
})

const cadastroSchema = JOI.object({
    nome: JOI.string().min(3).required(),
    email: JOI.string().email({tlds: {allow: true}}).required(),
    senha: JOI.string().min(3).required()
})

const edicaoSchema = JOI.object({
    nome: JOI.string().min(3).required(),
    senha: JOI.string().min(3).required()
})

const jogosSchema = JOI.object({
    nome: JOI.string().min(3).required(),
    desenvolvedora: JOI.string().min(3).required(),
    distribuidora: JOI.string().min(3).required(),
    genero: JOI.string().min(3).required(),
    subgenero: JOI.string().min(3).required(),
    preco: JOI.number().min(1).required()
})


module.exports = { loginSchema, cadastroSchema, edicaoSchema, jogosSchema };