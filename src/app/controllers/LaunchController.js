const Bank = require("../models/Bank");
const Category = require("../models/Category");
const Launch = require("../models/Launch");

module.exports = {
  async getLaunchs(req, res) {
    const { movement } = req.query;

    let launchs;
    launchs = await Launch.findAll({
      include: [Bank, Category],
    });

    if (movement) {
      launchs = await Launch.findAll({
        include: [Bank, Category],
        where: { movement: Number(movement) },
      });
    }

    try {
      return res.status(200).json(launchs);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar os Lançamentos. ${err}` });
    }
  },

  async insertLaunch(req, res) {
    const {
      description,
      category_id,
      classification_id,
      bank_id,
      value,
      status_launch_id,
      date_launch,
      date_venciment,
      movement
    } = req.body;
    
    let newValue = value && value.replace(',', '.');

    const launch = await Launch.create({
      description,
      category_id,
      classification_id,
      bank_id,
      value: Number(newValue),
      status_launch_id,
      date_launch,
      date_venciment,
      movement,
    });

    try {
      return res.status(200).json(launch);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao Cadastrar Lançamento. ${err}` });
    }
  },

  async updateLaunch(req, res) {
    const { id } = req.params;

    const {
      description,
      category,
      classification,
      bank,
      value,
      status,
      launchDate,
      launchVenciment,
      movement,
    } = req.body;

    let newValue = value && value.replace(',', '.');
    let launch = await Launch.findOne({ where: { id: id } });
    
    try {
      if (launch != null) {
        await launch.update({
          description: description,
          category_id: category,
          classification_id: classification,
          bank_id: bank,
          value: Number(newValue),
          status_launch_id: status,
          date_launch: launchDate,
          date_venciment: launchVenciment,
          movement: movement,
        });

        return res.status(200).json(launch);
      }
    } catch (err) {
      return res
        .status(200)
        .json({ msg: `Erro ao Atualizar Lançamento ${err}` });
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
        return res.status(400).json({ msg: `Erro ao Excluir Lançamento. ${err}` });
      }
    }
  },
};
