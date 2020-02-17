const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('tb_resposta',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    pergunta_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({
    force: false
}).then(() => {
    console.log("Alterações realizadas com exito");
});


module.exports = Resposta;