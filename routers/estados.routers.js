const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Estado = require("./../model/estados"); // import do modelo estados

// Rota GET home
router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Estados ok"});
});

// Rota GET retornando todos os Estados cadastrados
router.get('/listall', async (req,res) => {
    await Estado.find({}).then((estados) => { //pega todo mundo do banco
        console.log(estados);
        res.status(200).json(estados);
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

// Rota GET retornando por nome
router.get('/listname/:nome', async (req,res) => {
    const nome = req.params.nome;  //recebendo nome por parametro
    await Estado.findOne({ nome:nome }).then((estado) => { //findOne retorna o primeiro que der match com o item passado
        console.log(estado);
        if(estado == null){ //validando se retorna null 
            res.status(404).json({message: "Não foi encontrado"});
        }else{
            res.status(200).json(estado);
        }
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

// Rota POST com validação
router.post('/add', async (req,res) => { //add novo estado no banco

    //Validando as entradas do usuário
    if(!req.body.nome){
        res.status(400).json({message: "Nome na requisição está vazio!"});
        return;
    }else if(!req.body.regiao){
        res.status(400).json({message: "Região na requisição está vazio!"});
        return;
    }
    else if(!req.body.populacao){
        res.status(400).json({message: "População na requisição está vazio!"});
        return; 
    }
    else if(!req.body.salario_minimo){
        res.status(400).json({message: "Valor do Salário mínimo na requisição está vazio!"});
        return; 
    }

    await Estado.create(req.body).then(() => {
        res.status(200).json({message: "Cadastrado com sucesso"});
    }).catch((err) => {
        res.status(400).json({message: "Algo está errado"});
        console.error(err);
    })
});

// Rota PUT para edição de dado por Id
router.put('/update/:id', async (req,res) => { 
    const id = req.params.id;

    // Validações
    if(!id){
        res.status(400).json({message: "ID na requisição está vazio!"});
        return;
    }else if(!req.body.nome){
        res.status(400).json({message: "Nome na requisição está vazio!"});
        return;
    }else if(!req.body.regiao){
        res.status(400).json({message: "Região na requisição está vazio!"});
        return;
    }
    else if(!req.body.populacao){
        res.status(400).json({message: "População na requisição está vazio!"});
        return;
    }
    else if(!req.body.salario_minimo){
        res.status(400).json({message: "Valor do salário mínimo na requisição está vazio!"});
        return;
    }

    await Estado.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "Algo está errado"});
    });
});

// Rota DELETE com busca por Id
router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){ //se o id tem pelo menos 24 chars
        await Estado.deleteOne({_id:req.params.id}).then(() => { //deleta o primeiro que der match
            res.status(200).json({message: "Estado deletado com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "Algo está errado"});
        });
    }else{
        res.status(400).json({message: "ID precisa ter 24 caracteres"});
    }
});

module.exports = router;