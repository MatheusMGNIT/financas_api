const ejs = require("ejs");
const fs = require("fs");

module.exports = {
  async GenerateReport({ data, MailBody }) {
    console.log(data);
    const compiled = ejs.compile(
      fs.readFileSync(`${__dirname}/reports/${MailBody}`, "utf-8")
    );

    return compiled({ ...data });
  },
};
