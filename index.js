const express = require("express");
const app = express();

//Escolhendo o ejs como (engine) reindenizador de html
app.set("view engine","ejs");

//Arquivos estático
app.use(express.static('public'));

app.get("/:nome/:idade",(req, resp) => {
    //render pega os arquivos *.ejs de dentro do diretório /views
    var nome = req.params.nome;
    var idade = req.params.idade;

    var listas = [
        {pessoa: "smith"},
        {pessoa: "fulano"},
        {pessoa: "beltrano"}
    ];
    resp.render("index",{
        nome: nome,
        idade: idade,
        lista: listas
    });
});

app.listen(8080,()=>{
    console.log("Servidor rodando");
});