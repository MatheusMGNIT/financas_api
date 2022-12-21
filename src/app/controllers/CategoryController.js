const Category = require("../models/Category");
const User = require("../models/User");

module.exports = {
  async getCategors(req, res) {
    const uuid = req.headers.token;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });
    const categorys = await Category.findAll({
      where: { id_user: user.id },
      attributes: ["id", "description"],
    });

    try {
      return res.status(200).json(categorys);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar os Categorias` });
    }
  },

  async insertCategory(req, res) {
    const uuid = req.headers.token;
    const { description } = req.body;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    const category = await Category.create({
      description,
      id_user: user.id,
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
