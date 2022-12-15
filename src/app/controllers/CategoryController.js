const { where } = require("sequelize");
const Category = require("../models/Category");

module.exports = {
  async getCategors(req, res) {
    const categorys = await Category.findAll({
      attributes: ["id", "description"],
    });

    try {
      return res.status(200).json(categorys);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar os Categorias` });
    }
  },

  async insertCategory(req, res) {
    const { description } = req.body;

    const category = await Category.create({
      description,
    });

    try {
      return res.status(200).json(category);
    } catch (err) {
      return res
        .status(400)
        .json({ msg: `Erro ao Cadastrar Categoria ${err}` });
    }
  },

  async updateCategory(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    let category = await Category.findOne({ where: { id: id } });

    if (category != null) {
      await category.update({
        description,
      });
      category = await Category.findOne({ where: { id: id } });
      try {
        return res.status(200).json(category);
      } catch (err) {
        return res
          .status(400)
          .json({ msg: `Erro ao Atualizar Categoria ${err}` });
      }
    }
  },

  async deleteCategory(req, res) {
    const { id } = req.params;

    const category = await Category.findOne({ where: { id: id } });

    if (category != null) {
      await Category.destroy({ where: { id: id } });
      try {
        return res.status(200).json(category);
      } catch (err) {
        return res.status(200).json({ msg: `Erro ao Excluir Categoria` });
      }
    }
  },
};
