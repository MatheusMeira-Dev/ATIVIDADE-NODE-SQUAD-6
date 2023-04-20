const Professor = require("../database/professor");
const Turma = require("../database/turma")

const {Router} = require("express");
// Criar o grupo de rotas
const router = Router();

// Add Turma
router.post("/turmas", async (req, res) => {
    const {nome, materia, periodo, professorId } = req.body

    try {
        const professor = await Professor.findOne({ where: { id: professorId }})
        if (professor) {
            const novo = await Turma.create ({nome, materia, periodo, professorId});
            res.status(201).json(novo);
        } else {
            res.status(404).json({ message: "Professor não encontrado!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "Um erro aconteceu."})
    }
});

// Listar turmas
router.get("/turmas", async (req, res) => {
    const listaTurmas = await Turma.findAll()
    res.json(listaTurmas)
})

//Listar turma por id
router.get("/turmas/:id", async (req, res) => {
    const { id } = req.params;
    const turma = await Turma.findByPk(id);

    if (turma) {
        res.json(turma);
    } else {
        res.status(404).json({ message: "Turma não encontrada." });
    }
});

// Atualizar Turmas
router.put("/turmas/:id", async (req, res) => {
    const { nome, materia, periodo } = req.body;
    const { id } = req.params;

    try {
        const turma = await Turma.findByPk(id);
        if (turma) {
            await Turma.update(
                { nome, materia, periodo }, 
                { where: { id } })
            res.json({ message: "Turma editada." })
        }
        else {
            res.status(404).json({ message: "Turma não encontrada." })
        }

    } catch (err) {
        res.status().json({ message: "Um erro acoteceu." })
    }
});

// excluir turma
router.delete("/turmas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const turma = await Turma.findByPk(id);
        if (turma) {
            await turma.destroy();
            res.status(200).json("turma Removida.")
        }
        else {
            res.status(404).json({ message: "Turma não encontrada." });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro acoteceu." })
    }
})

module.exports = router;