const express = require("express"); //chamando o express
const app = express(); //definindo o app como express
require("dotenv").config();
app.use(express.json()); //definindo o JSON no projeto

const Conn = require("./model/conn/index"); //importando a conexao

Conn(); //executa a func de conexao

const port = 3000; //porta do node

const paisesRouter = require("./routers/paises.routers");
app.use("/paises", paisesRouter);

const estadosRouter = require("./routers/estados.routers");
app.use("/estados", estadosRouter);

const cidadesRouter = require("./routers/cidades.routers");
app.use("/cidades", cidadesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
