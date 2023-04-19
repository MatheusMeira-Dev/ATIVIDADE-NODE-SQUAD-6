const Aluno = require("./aluno");
const {connection} = require("./database");
const {DataTypes} = require ("sequelize")

const Turma = connection.define("turma", {
    nome: {
        // nome VARCHAR NOT NULL
        type: DataTypes.STRING(130),
        allowNull: false, // NOT NULL
    },
    materia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Turma.hasMany(Aluno, { onDelete: "CASCADE"});
Aluno.belongsTo(Turma);


module.exports = Turma;