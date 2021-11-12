const mongoose = require("mongoose");  //importando o mongoose

const cidadesModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    bairros_total: { type: Number, required: true },
    populacao: { type: Number, required: true },
    aniversario_cidade: { type: String, required: true } 
});

const Cidade = mongoose.model("Cidades",cidadesModel); // a criacao do modelo na colection Cidades

module.exports = Cidade; //exportando o modelo pronto