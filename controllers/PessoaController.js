const { Pessoa } = require('../models');
const axios = require('axios');

const createCadastro = async (req, res) => {
  try {
    const pessoa = await Pessoa.create(req.body);
    return res.status(201).json(pessoa);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCadastro = async (req, res) => {
  try {
    const cadastro = await Pessoa.findAll();
    return res.status(200).json(cadastro);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCadastroById = async (req, res) => {
  try {
    const { id } = req.params;
    const cadastro = await Pessoa.findOne({
      where: { id_pessoa: id }
    });
    if (cadastro) {
      return res.status(200).json(cadastro);
    }
    return res.status(404).json({ message: 'Cadastro não encontrado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCadastro = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nome, CPF, Telefone } = req.body;
    const cadastro = await Pessoa.findByPk(id);
    if (!cadastro) {
      return res.status(404).json({ error: 'Cadastro não encontrado' });
    }
    cadastro.Nome = Nome;
    cadastro.CPF = CPF;
    cadastro.Telefone = Telefone;
    await cadastro.save();
    return res.status(200).json(cadastro);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar cadastro', details: error.message });
  }
};

const deleteCadastro = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pessoa.destroy({
      where: { id_pessoa: id }
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Cadastro não encontrado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCadastro,
  getAllCadastro,
  getCadastroById,
  updateCadastro,
  deleteCadastro,
};