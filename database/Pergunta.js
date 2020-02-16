const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('tb_pergunta',{
    titulo:{
        type: Sequelize.STRING, //tipo texto curto
        allowNull: false //não nullo
    },
    descricao:{
        type: Sequelize.TEXT, //texto longo
        allowNull: false
    }
});

Pergunta.sync({ //sincroiza o banco o banco com o arquivo
    force: false //não força a criação da tabela caso ela exista
}).then(() => {
    console.log("Alterações realizadas com exito");
})

module.exports = Pergunta;