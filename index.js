const express = require("express");
const app = express();

//npm install body-parser --save
// traduz os dados enviados pelo formulário para o JS
const bodyParse = require("body-parser");

// importa o arquivo para conectar com o mysql
const connection = require("./database/database");

// importando model
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//chamando conexão
connection
    .authenticate() //loga no mysql
    //try catch
    .then(() => {
        console.log("Conectado com exito !!!");
    })
    .catch((msgErro) => {
        console.log(msgErro)
    });

//Escolhendo o ejs como (engine) reindenizador de html
app.set("view engine","ejs");

//Arquivos estático
app.use(express.static('public'));

//decodificando os dados enviados pelo formulário
app.use(bodyParse.urlencoded({
    extend: false
}));

// Configuração para permitir que ele leia dados e form enviados via json
app.use(bodyParse.json());


//Rotas
app.get("/",(req,resp) => {
    //raw true faz o findAll fazer uma busca limpa
    Pergunta.findAll({
        raw: true,
        order:[
            ['id', 'desc'] //order by
        ]
    }).then(perguntas => { // SELECT *
        resp.render("index",{
            perguntas: perguntas
        });
    }); 
    
})

//Pergunta
app.get("/perguntar",(req,resp) => {
    resp.render("perguntar",{

    });
});

app.post("/salvarpergunta",(req,resp) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({ //INSERT INTO
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        resp.redirect("/"); //redireciona
    })
});

app.get("/pergunta/:id", (req,resp) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {

            Resposta.findAll({
                where: {pergunta_id: pergunta.id},
                raw: true,
                order: [
                    ['id', 'desc']
                ]
            }).then(respostas => {

                resp.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });

            });

        } else {
            resp.redirect("/");
        }
    })
})

//Resposta
app.post("/salvaresposta",(req,resp) => {
    var resposta = req.body.resposta;
    var pergunta = req.body.pergunta;

    Resposta.create({
        corpo: resposta,
        pergunta_id: pergunta
    }).then(() => {
        resp.redirect("/pergunta/" + pergunta);
    })
})

app.listen(8080,() => {
    console.log("Servidor rodando");
});