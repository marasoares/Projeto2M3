const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Pais = require("./../model/paises"); // import do modelo paises

router.get('/', (req,res) => {
    res.status(200).json({message:"Rota Países ok"});
});

router.get('/listall', async (req,res) => {
    await Pais.find({}).then((paises) => { //pega todo mundo do banco
        console.log(paises);
        res.status(200).json(paises);
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

router.get('/listname/:nome', async (req,res) => {
    const nome = req.params.nome;  //recebendo nome por parametro
    await Pais.findOne({ nome:nome }).then((pais) => { //findOne retorna o primeiro que der match com o item passado
        console.log(pais);
        if(pais == null){ //validando se retorna null 
            res.status(404).json({message: "Não foi encontrado"});
        }else{
            res.status(200).json(pais);
        }
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

router.post('/add', async (req,res) => { //add novo país no banco

    //Validando as entradas do usuário
    if(!req.body.nome){
        res.status(400).json({message: "Nome na requisição está vazio!"});
        return;
    }else if(!req.body.populacao){
        res.status(400).json({message: "População na requisição está vazio!"});
        return;
    }
    else if(!req.body.lingua_mae){
        res.status(400).json({message: "Língua mãe na requisição está vazio!"});
        return; 
    }
    else if(!req.body.pib){
        res.status(400).json({message: "PIB na requisição está vazio!"});
        return; 
    }

    await Pais.create(req.body).then(() => {
        res.status(200).json({message: "Cadastrado com sucesso"});
    }).catch((err) => {
        res.status(400).json({message: "Algo está errado"});
        console.error(err);
    })
});

router.put('/update/:id', async (req,res) => {
    const id = req.params.id;

    // Validações
    if(!id){
        res.status(400).json({message: "ID na requisição está vazio!"});
        return;
    }else if(!req.body.nome){
        res.status(400).json({message: "Nome na requisição está vazio!"});
        return;
    }else if(!req.body.populacao){
        res.status(400).json({message: "População na requisição está vazio!"});
        return;
    }
    else if(!req.body.lingua_mae){
        res.status(400).json({message: "Língua mãe na requisição está vazio!"});
        return;
    }
    else if(!req.body.pib){
        res.status(400).json({message: "PIB na requisição está vazio!"});
        return;
    }

    await Pais.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "Algo está errado"});
    });
});

router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){ //se o id tem pelo menos 24 chars
        await Pais.deleteOne({_id:req.params.id}).then(() => { //deleta o primeiro que der match
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