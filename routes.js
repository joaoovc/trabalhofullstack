const express = require('express');
const PessoaController = require('./controllers/PessoaController');

const router = express.Router();

router.post('/cadastro', PessoaController.createCadastro);
router.get('/cadastro', PessoaController.getAllCadastro);
router.get('/cadastro/:id', PessoaController.getCadastroById);
router.put('/cadastro/:id', PessoaController.updateCadastro);
router.delete('/cadastro/:id', PessoaController.deleteCadastro);

module.exports = router;