const mongoose = require("mongoose"); //importando o mongoose

async function Conn() {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_BASE}`,{
        //await mongoose.connect("mongodb+srv://admin:blue2021@cluster0.mceus.mongodb.net/PROJETO2",{
        //await mongoose.connect("mongodb://localhost:27017/PROJETO2",{ // string de conexao local
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      // tudo certo faz isso
      console.log("MongoDB esta conectado");
    })
    .catch((err) => {
      // caso de erro faz isso
      console.error(err);
    });
}

module.exports = Conn; //exporta a conexao
