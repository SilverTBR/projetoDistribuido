const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.email,
        pass: process.env.senha
    },
    tls:{
        rejectUnauthorized: false
    }
})



module.exports = {
    enviarEmail: async function (email, nome, mensagem, assunto) {
        const remetente = `${nome} <${email}>`; 
        const resultado = await transporter.sendMail({
            text: mensagem,
            subject: assunto,
            from: remetente,
            to: process.env.email,
            replyTo: remetente
        })
        return resultado
    }
}