const { DataTypes } = require("sequelize");
const { connection } = require("./database");


const Aluno = connection.define("aluno", {
    
    nome: {
        type: DataTypes.STRING(130),
        allowNull: false,
    },
    idade: {
        type: DataTypes.STRING(130),
        allowNull: false,
    },
    matricula: {
        type: DataTypes.STRING(130),
        allowNull: false,
        unique: true,
    },
    telefone: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false,
      },
      dataNasc: {
        type: DataTypes.DATE,
        allowNull: false,
        
    }
})


module.exports = Aluno;
