const mongoose = require("mongoose");  //importando o mongoose

const paisesModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    populacao: { type: Number, required: true },
    lingua_mae: { type: String , required: true },
    pib: { type: Number, required: true } 
});

const Pais = mongoose.model("Paises",paisesModel); // a criacao do modelo na colection Paises

module.exports = Pais; //exportando o modelo pronto