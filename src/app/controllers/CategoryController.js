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
};
