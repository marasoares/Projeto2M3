const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Cidade = require("./../model/cidades"); // import do modelo paises

// Rota GET home
router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Cidades ok"});
});

// Rota GET retornando todos os dados do banco
router.get('/listall', async (req,res) => {
    await Cidade.find({}).then((cidades) => { //pega todo mundo do banco
        console.log(cidades);
        res.status(200).json(cidades);
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

// Rota GET retornando o dado por nome
router.get('/listname/:nome', async (req,res) => {
    const nome = req.params.nome;  //recebendo nome por parametro
    await Cidade.findOne({ nome:nome }).then((cidade) => { //findOne retorna o primeiro que der match com o item passado
        console.log(cidade);
        if(cidade == null){ //validando se retorna null 
            res.status(404).json({message: "Não foi encontrado"});
        }else{
            res.status(200).json(cidade);
        }
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

// Rota POST com validação
router.post('/add', async (req,res) => { //add nova cidade no banco

    //Validando as entradas do usuário
    if(!req.body.nome){
        res.status(400).json({message: "Nome na requisição está vazio!"});
        return;
    }else if(!req.body.bairros_total){
        res.status(400).json({message: "Quantidade de Bairros na requisição está vazio!"});
        return;
    }
    else if(!req.body.populacao){
        res.status(400).json({message: "População na requisição está vazio!"});
        return; 
    }
    else if(!req.body.aniversario_cidade){
        res.status(400).json({message: "Data de aniversário da Cidade na requisição está vazio!"});
        return; 
    }

    await Cidade.create(req.body).then(() => {
        res.status(200).json({message: "Cadastrado com sucesso"});
    }).catch((err) => {
        res.status(400).json({message: "Algo está errado"});
        console.error(err);
    })
});

// Rota PUT alterando dado por Id com validação
router.put('/update/:id', async (req,res) => {
    const id = req.params.id;

    // Validações
    if(!id){
        res.status(400).json({message: "ID na requisição está vazio!"});
        return;
    }else if(!req.body.nome){
        res.status(400).json({message: "Nome na requisição está vazio!"});
        return;
    }else if(!req.body.bairros_total){
        res.status(400).json({message: "Quantidade de Bairros na requisição está vazio!"});
        return;
    }
    else if(!req.body.populacao){
        res.status(400).json({message: "População na requisição está vazio!"});
        return;
    }
    else if(!req.body.aniversario_cidade){
        res.status(400).json({message: "Data de aniversário da Cidade na requisição está vazio!"});
        return;
    }

    await Cidade.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "Algo está errado"});
    });
});

// Rota DELETE retornando dado por Id
router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){ //se o id tem pelo menos 24 chars
        await Cidade.deleteOne({_id:req.params.id}).then(() => { //deleta o primeiro que der match
            res.status(200).json({message: "Deletado com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "Algo está errado"});
        });
    }else{
        res.status(400).json({message: "ID precisa ter 24 caracteres"});
    }
});

module.exports = router;