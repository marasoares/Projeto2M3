##### Integração Back + Mongo Atlas + Heroku

Projeto visando o cadastro de banco de dados sobre Países, Estados e Cidades, com rotas e banco de dados distintos, através do VS Code.

Criada pasta routers onde foram cadastradas as rotas: paises.routers, estados.routers e cidades.routers.

Em cada rota foi utilizado CRUD, da seguinte forma:

Na rota países, no método `GET` realizamos o retorno de todos os países cadastrados ("./paises/listall")

- `GET/listall`

```javascript
router.get('/listall', async (req,res) => {
    await Pais.find({}).then((paises) => { //pega todo mundo do banco
       console.log(paises);
       res.status(200).json(paises);
  }).catch((err) => {
       res.status(404).json({message:"Nada foi encontrado"});
       console.error(err);
});

```

É possível, ainda, retornar por nome ("./paises/listname/:nome")

•	`GET/listname`

```javascript
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


```



Ambas as rotas são assíncronas tendo em vista que estamos utilizando um banco externo (Mongo Atlas) para retornar as informações.

Utilizamos as condicionais (if, else if) para validar as informações que o usuário solicita.

Por tratarmos de um projeto Backend, as informações de erro, não são passadas na tela, para isso utilizamos o Código de Status de Erros do HTML.

Já na subrota `POST`, utilizamos as condicionais para validar os dados solicitados no Banco de Dados de Países, que são:

•	`banco.paises.js`

```javascript
[

  {

       "nome":"Brasil",

       "populacao":212600000,

       "lingua_mae":"Português",

       "pib": 2143400000

  }

]


```

Conforme o código abaixo:

•	`POST/add`

```javascript
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

```



Importante ressaltar que em cada condição adicionamos o `return` para que, caso tenha alguma informação incorreta ou a falta da mesma, o usuário não prossiga na inserção de dados.

Estando tudo correto, a inserção dos dados é realizada, retornando um código 200 ou 400, a seguir:

```javascript
await Pais.create(req.body).then(() => {
       res.status(200).json({message: "Cadastrado com sucesso"});
  }).catch((err) => {
       res.status(400).json({message: "Algo está errado"});
       console.error(err);
  })

```



Na subrota `PUT` utilizamos as mesmas condicionais para validar a alteração de dados utilizando como parâmento o Id gerado no Mongo Atlas através dos campos: nome, população, língua mãe e pib, conforme abaixo:

•	`PUT/update/:id`

```javascript
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


```



Da mesma forma, estando corretos os dados informados, a alteração dos dados é realizada:

```javascript
await Pais.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
       res.status(200).json({message: "Atualizado com sucesso"});
  }).catch((err) => {
       console.error(err);
       res.status(400).json({message: "Algo está errado"});
  });
```

Na rota `DELETE`, foi utilizado como parâmetro o Id do Mongo Atlas para realizar a busca do dado a ser excluído, restando a quantidade de caracteres do mesmo (24) como base para essa busca.

•	`DELETE/delete/:id`

```javascript
router.delete('/delete/:id', async (req,res) => {
   if( req.params.id.length == 24){ //se o id tem pelo menos 24 chars
       await Pais.deleteOne({id:req.params.id}).then(() => { //deleta o primeiro que der match*
           *res.status(200).json({message: "Deletado com sucesso"});*
      *}).catch((err) => {*
           *console.error(err);*
           *res.status(400).json({message: "Algo está errado"});*
      }*);
  }else{
       res.status(400).json({message: "ID precisa ter 24 caracteres"});
  }
});

```



As demais rotas (estados e cidades), seguimos a mesma metodologia, contudo alterando as informações a serem validadas, adequando para cada necessidade, conforme abaixo:
•	`banco.estados.js`

```javascript
[
    {
        "nome":"Rio de Janeiro",
        "regiao":"Sudeste",
        "populacao":17463349,
        "salario_minimo":1100
    }
]

```

•	`banco.cidades.js`

```javascript
[
    {
        "nome":"Rio de Janeiro",
        "bairros_total":163,
        "populacao":6775561,
        "aniversario_cidade":"01.03"
    }
]

```



Utilizamos, também, na pasta `model/conn` o modelo de informações padronizadas para cada Banco e o tipo de dado aceito no cadastro (type: string/number) e se a inclusão dos mesmos é obrigatória ou não, utilizando o comando Schema:

- `model/conn/paises`

```javascript
const paisesModel = new mongoose.Schema({ //criando nosso modelo do banco
   nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
   populacao: { type: Number, required: true },
   lingua_mae: { type: String , required: true },
   pib: { type: Number, required: true } 
   });
```

- `model/conn/estados`

```javascript
const estadosModel = new mongoose.Schema({ //criando nosso modelo do banco
	nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
	regiao: { type: String, required: true },
	populacao: { type: Number , required: true },
	salario_minimo: { type: Number, required: true } 
});
```

- `model/conn/cidades`

```javascript
const cidadesModel = new mongoose.Schema({ //criando nosso modelo do banco
	nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
	bairros_total: { type: Number, required: true },
	populacao: { type: Number, required: true },
	aniversario_cidade: { type: String, required: true } 
});
```



Com isso, realizamos o CRUD no projeto, exportando as rotas externas para o index.js através do comando `module exports = router` para cada rota.

Utilizamos o Thunder Client para criação do Environment Variables para gerarmos as Collections de cada rota com o CRUD. 

Projeto configurado e conectado ao Mongo Atlas. 

Deploy do projeto no Heroku.

=======