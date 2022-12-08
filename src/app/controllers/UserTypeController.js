const UserType = require("../models/UserType");

module.exports = {
  async getUserTypes(req, res) {
    const user_types = await UserType.findAll({
      attributes: ["id", "description"],
    });
    try {
      return res.status(200).json(user_types);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar dados. ${err}` });
    }
  },
};
