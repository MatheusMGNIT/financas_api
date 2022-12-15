const Launch = require("../models/Launch");
const { getMovements } = require("./MovementController");

module.exports = {
  async getLaunchs(req, res) {
    const launchs = await Launch.findAll();

    try {
      return res.status(200).json(launchs);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar os Lançamentos` });
    }
  },

  async getLaunchMovements(req, res) {
    const { movement } = req.params;

    const launchs = await Launch.findOne({ where: { movement: movement } });

    if (launchs != null) {
      try {
        return res.status(200).json(launchs);
      } catch (err) {
        return res.status(400).json({ msg: `Erro ao carregar os Lançamentos` });
      }
    }
  },

  async insertLaunch(req, res) {
    const {
      description,
      category,
      classification,
      bank,
      value,
      status,
      launchDate,
      launchVencimentDate,
      movement,
    } = req.body;
    console.log(req.body);

    const launch = await Launch.create({
      description: description,
      category_id: category,
      classification_id: classification,
      bank_id: bank,
      value: value,
      status_launch_id: status,
      date_launch: launchDate,
      date_venciment: launchVencimentDate,
      movement: movement,
    });

    try {
      return res.status(200).json(launch);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao Cadastrar Lançamento ` });
    }
  },

  async updateLaunch(req, res) {
    const { id } = req.params;

    const {
      description,
      category,
      classification,
      bank,
      valueMask,
      status,
      launchDate,
      launchVencimentDate,
      movement,
    } = req.body;

    let launch = await Launch.findOne({ where: { id: id } });

    if (launch != null) {
      await Launch.update({
        description: description,
        category_id: category,
        classification_id: classification,
        bank_id: bank,
        value: valueMask,
        status_launch_id: status,
        date_launch: launchDate,
        date_venciment: launchVencimentDate,
        movement: movement,
      });

      launch = await Launch.findOne({ where: { id: id } });
      try {
        return res.status(200).json(launch);
      } catch (err) {
        return res
          .status(200)
          .json({ msg: `Erro ao Atualizar Lançamento ${err}` });
      }
    }
  },

  async deleteLaunch(req, res) {
    const { id } = req.params;

    const launch = await Launch.findOne({ where: { id: id } });

    if (launch != null) {
      await Launch.destroy({ where: { id: id } });

      try {
        return res.status(200).json(launch);
      } catch (err) {
        return res.status(400).json({ msg: `Erro ao Excluir Lançamento` });
      }
    }
  },
};
