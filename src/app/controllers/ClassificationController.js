const Classification = require("../models/Classification");

module.exports = {
  async getClassifications(req, res) {
    const classifications = await Classification.findAll({
      attributes: ["id", "description"],
    });

    try {
      return res.status(200).json(classifications);
    } catch (err) {
      return res
        .status(400)
        .json({ msg: `Erro ao carregar os Classificações` });
    }
  },
};
