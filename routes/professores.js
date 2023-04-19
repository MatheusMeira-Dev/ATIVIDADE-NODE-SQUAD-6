const Professor = require("../database/professor");
const { Router } = require("express");

const router = Router();

//POST
router.post("/professores", async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const professor = await Professor.create({ nome, email, telefone });
    res.status(201).json({message: "Professor(a) criado com sucesso!", professor: professor});
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro!" });
  }
});

//GET
router.get("/professores", async (req, res) => {
    const dadosProfessores = await Professor.findAll()
    try {
      res.status(201).json(dadosProfessores);
    } catch(err) {
      res.status(500).json({ message: "Professor(a) não encontrado!" });
    }
  });

  //GET BY ID
  router.get("/professores/:id", async (req, res) => {
    const idProfessores = await Professor.findOne({where: {id: req.params.id}})
    if (idProfessores){
      res.status(201).json(idProfessores);
    } else {
      res.status(404).json({message:"Professor(a) não encontrado!"})
    }
  });

  //PUT
router.put("/professores/:id", async (req, res) => {
  const {id} = req.params
  const { nome, telefone, email } = req.body
  try {
    const professores = await Professor.findOne({where: {id}})
    if (professores) {
      professores.update({nome, telefone, email})
      res.json({message: "Professor(a) editado!"})
    } else {
      res.status(404).json({message: "Professor não encontrado!"})
    }
  } catch (err) {
    res.status(500).json({message: "Um erro aconteceu!"})
  }
});

router.delete("/professores/:id", async (req, res) => {
  const {id} = req.params
  try {
    const professor = await Professor.findByPk(id)
    if (professor) {
      professor.destroy()
      res.status(200).json("Professor removido!")
    } else {
      res.status(404).json({message: "Professor não encontrado!"})
    }
  } catch (err) {
    res.status(500).json({message: "Um erro aconteceu!"})
  }
});



module.exports = router;