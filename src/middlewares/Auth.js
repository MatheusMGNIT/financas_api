const User = require("../app/models/User");

module.exports = {
  private: async (req, res, next) => {
    if (!req.headers.authorization) {
    }

    let token = "";

    if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    if (token == "") {
      return res.json({ msg: "Precisa está logado no Sistema" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.json({ notallowed: true });
    }

    next();
  },
};
