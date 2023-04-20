// immportações
require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express'); 
const swaggerFile = require("./routes/swagger.json");

//Configuração do App
const app = express();
app.use(express.json());
app.use(morgan("dev"));

//Configuração do Banco de dados
const { connection, authenticate } = require("./database/database");
authenticate(connection);

// Definição de Rotas
const rotaAlunos = require("./routes/alunos");
const rotaProfessores = require("./routes/professores");
const rotaTurmas = require("./routes/turmas");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(rotaAlunos);
app.use(rotaProfessores);
app.use(rotaTurmas);


// Escuta de eventos
app.listen(3000, () => {
    connection.sync({force: true});
    console.log("Servidor rodando em http://localhost:3000/")
})