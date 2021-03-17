const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const { smtp, auth, mailto } = require('../../config/email');
const { validate } = require('../middleware/contactValidate')

router.post('/email', async (req, res) => {

    try {
        const errors = await validate(req.body);
        if(Array.isArray(errors)){
           res.status(400).json({ message: errors });
        }

        const templateHtml = `
            <div style="border: 1px solid #000; border-radius: 5px; max-width: 600px; width: 600px; margin: 0 auto; display: block; padding: 0 20px;">
                <h1 style="text-align: center; color: #3786bd;"> Fomulário de Contato </h1>
                <p><strong>Nome:</strong> ${req.body.name}</p> 
                <p><strong>Assunto escolhido:</strong> ${req.body.subject}</p> 
                <p><strong>Emal:</strong> ${req.body.email}</p>  
                <p><strong>Mensagem:</strong><br> ${req.body.message}</p>
            </div> 
        `

        let transporter = nodemailer.createTransport({
            host: smtp,
            port: 587,
            auth: {
            user: auth.user, // generated ethereal user
            pass: auth.pass, // generated ethereal password
            },
        });

        let mailOptions = {
            from: req.body.email, 
            /*to: mailto, 
                o email será enviado para o email digitado no campo do formulario para mostrar que está funcionando.
            */
            to: req.body.email,
            subject: req.body.subject,
            html: templateHtml
        };
    
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: ['Mensagem enviada !'] });
        
    } catch (error) {
        res.status(500).json({ message: ['Erro ao enviar a mensagem '] })
    }



 

/*
   console.log(info);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    //console.log('chegou')
    //return res.status(404).json('Usuário ou senha inválido')
    */
});

module.exports = router;
