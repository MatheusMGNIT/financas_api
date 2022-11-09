const { validationResult, matchedData } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      res.json({ error: "E-mail e/ou senha errados!" });
      return;
    }
    const match = await bcrypt.compare(data.password, user.password_hash);
    if (!match) {
      res.json({ error: "E-mail e/ou senha errados!" });
      return;
    }

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();

    res.json({ token, email: data.email });
  },
};
