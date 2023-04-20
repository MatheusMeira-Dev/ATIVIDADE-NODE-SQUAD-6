const Aluno = require("../database/aluno")
const { Router } = require("express");
const Turma = require("../database/turma");

const router = Router();

// Buscar todos os alunos 
router.get("/alunos", async (req, res) => {
    // SELECT * FROM clientes;
    const listaAlunos = await Aluno.findAll();
    // Quando o findAll é executado, ele envia uma consulta SQL SELECT para o banco de dados para recuperar todos os registros da tabela correspondente
    res.json(listaAlunos);
});

// Buscar aluno de acordo com o id 

router.get("/alunos/:id", async (req, res) => {

    const { id } = req.params

    const alunoBuscado = await Aluno.findOne({ where: { id } })

    if (alunoBuscado) {
        res.json(alunoBuscado)
    } else {

        res.status(404).json({ message: "Aluno não encontrado" })
    }
})

// Adicionar aluno

router.post("/alunos", async (req, res) => {

    const { nome, idade, matricula, telefone, dataNasc, turmaId } = req.body;

    try {
        const turma = await Turma.findOne({ where: { id: turmaId }})
        if (turma) {
            const novo = await Aluno.create(
                { nome, idade, matricula, telefone, dataNasc, turmaId })
            res.status(201).json(novo);
        } else {
            res.status(404).json({ message: "Essa turma não existe!"})
        }
    } catch (err) {

        res.status(500).json({ message: "Um erro aconteceu." })

    }

})

router.put("/alunos/:id", async (req, res) => {

    const { nome, idade, matricula, telefone, dataNasc, turmaId } = req.body
    const {id} = req.params
    const aluno =  await Aluno.findOne({ where: { id } })

    try {
    if (aluno) {

        await Aluno.update({nome, idade, matricula, telefone, dataNasc}, {where: {id}})

        res.status(200).json({message:"Aluno editado"})


    } else {

        res.status(404).json({message:"Aluno não encontrado"})

    }

 } catch (err) {
    res.status(500).json({message:"Um erro aconteceu"})


    }
})

router.delete("/alunos/:id", async (req, res) => {
  
    const {id} = req.params
    const aluno = await Aluno.findOne({where:{id}})
  
    try {
    if (aluno) {
     await aluno.destroy()
     res.status(200).json("Aluno Removido")
  
    } else {
  
      res.status(404).json({message:"Aluno não encontrado"})
    } }
    catch (err) {
      console.error(err)
      res.status(500).json({message:"Um erro aconteceu"})
    }
  })


module.exports = router;