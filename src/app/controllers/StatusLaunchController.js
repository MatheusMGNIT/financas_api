const StatusLaunch = require("../models/StatusLaunch");

module.exports = {
  async getStatusLaunchs(req, res) {
    const status_launchs = await StatusLaunch.findAll({
      attributes: ["id", "description"],
    });

    try {
      return res.status(200).json(status_launchs);
    } catch (err) {
      return res
        .status(400)
        .json({ msg: `Erro ao carregar os Status de Lançamentos` });
    }
  },
};
