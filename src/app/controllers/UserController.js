const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      res.status(400).json({
        error: { email: { mgs: "E-mail já existe" } },
      });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = User.create({
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      token,
      state: data.state,
    });

    (await newUser).save;

    res.status(200).json({ token });
  },
};
