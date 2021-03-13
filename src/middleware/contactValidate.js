const yup = require('yup');

let schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório!'),
    email: yup.string().email('E-mail Invalido!').required('E-mail obrigatório!'),
    subject: yup.string().oneOf(['Crítica', 'Dúvida', 'Elogio', 'Sugestões'], 'Selecione um assunto'),
    message: yup.string().required('Mensagem é obrigatório!')
});


function validate (body){
    return schema.validate(body, { abortEarly: false }).catch(function (err) {
        return err.errors;
    });
}

module.exports = { validate }