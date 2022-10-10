const State = require("../models/State");

module.exports = {
  async getStates(req, res) {
    const state = await State.findAll();
    return res.json(state);
  },
  async insertState(req, res) {
    const { name } = req.body;
    const state = await State.create({
      name,
    });
    return res.json(state);
  },
};
