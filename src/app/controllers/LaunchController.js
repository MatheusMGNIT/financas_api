const Launch = require("../models/Launch");

module.exports = {
  async getLaunchs(req, res) {
    const launchs = await Launch.findAll({
      attributes: ["id", "description"],
    });

    try {
      return res.status(200).json(launchs);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar os Lançamento` });
    }
  },
};
