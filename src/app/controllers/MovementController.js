const Movement = require("../models/Movement");

module.exports = {
  async getMovements(req, res) {
    const movements = await Movement.findAll({
      attributes: ["id", "description"],
    });

    try {
      return res.status(200).json(movements);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar as Movimentações` });
    }
  },
};
