//npm install --save sequelize
//npm install --save mysql2

//configurando banco
const Sequelize = require("sequelize");

const connection = new Sequelize("db_guia_perguntas",'root','',{
    host: 'localhost',
    dialect: 'mysql' //qual tipo de banco
});

module.exports = connection;