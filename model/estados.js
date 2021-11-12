const mongoose = require("mongoose");  //importando o mongoose

const estadosModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    regiao: { type: String, required: true },
    populacao: { type: Number , required: true },
    salario_minimo: { type: Number, required: true } 
});

const Estado = mongoose.model("Estados",estadosModel); // a criacao do modelo na colection Estados

module.exports = Estado; //exportando o modelo pronto