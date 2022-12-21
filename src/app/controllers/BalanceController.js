const connection = require("../../database/index");
const moment = require("moment");
const puppeteer = require("puppeteer");
const User = require("../models/User");
const { GenerateReport } = require("../../services/GenerateReport");

module.exports = {
  async getBalanceMonth(req, res) {
    const { month, dateStart, dateEnd } = req.query;
    const uuid = req.headers.token;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    const [primaryDay] = await connection.query(`
      select generate_series ( '2022-01-01'::timestamp, '2022-12-01'::timestamp, '1 month'::interval) as "day1";
    `);
    const [lastDay] = await connection.query(`
      select (date_trunc('month', generate_series ( '2022-01-01'::timestamp, '2022-12-01'::timestamp, '1 month'::interval)) + interval '1 month' - interval '1 day') as "lastDay"
    `);

    const formatedDay1 = primaryDay.map((element, index) => {
      return {
        id: index,
        data: element.day1,
      };
    });
    const formatedDay2 = lastDay.map((element, index) => {
      return {
        id: index,
        data: element.lastDay,
      };
    });

    let formatedDay = [];

    formatedDay1.forEach((element) => {
      formatedDay2.forEach((element2) => {
        if (element.id == element2.id) {
          formatedDay.push({ inicio: element.data, final: element2.data });
        }
      });
    });

    let dateQuery = "";
    let monthQuery = "";

    if (month != -1) {
      const mes = Number(month);

      if (mes) {
        let dataInicio = moment(formatedDay[mes].inicio).format();
        let dataFinal = moment(formatedDay[mes].final).format();
        dateQuery = "";
        monthQuery = `and date_launch between '${dataInicio}' and '${dataFinal}'`;
      }
    }

    if (dateStart != "null" && dateEnd != "null") {
      let dataStart = moment(dateStart).format();
      let dataEnd = moment(dateEnd).format();
      monthQuery = "";
      dateQuery = `and date_launch between '${dataStart}' and '${dataEnd}'`;
    }

    const [balanceMonth] = await connection.query(
      `select 
        l.*, b.name_bank as banco,  c.description as categoria , c2.description as classificacao, sl.description as status
        from launch l 
        left join bank b on b.id = l.bank_id  	
        left join category c on c.id = l.category_id 
        left join classification c2 on c2.id = l.classification_id 
        left join status_launch sl on sl.id = l.status_launch_id 
        where l.id_user = ${user.id}
        ` +
        dateQuery +
        `
        ` +
        monthQuery +
        ` group by b.name_bank, l.id, b.id, c.id, c2.id, sl.description `
    );

    let data;
    let receitas = [];
    let despesas = [];
    if (balanceMonth.length > 0) {
      data = balanceMonth.map((element) => {
        return {
          descricao: element.description,
          data_inicial: element.date_launch
            ? moment(element.date_launch).format("DD/MM/yyyy")
            : "",
          movimentacao: element.movement == 1 ? "Receita" : "Despesa",
          categoria: element.categoria,
          classificacao: element.classificacao,
          valor: element.value,
          data_vencimento: element.date_venciment
            ? moment(element.date_venciment).format("DD/MM/yyyy")
            : "",
          status: element.status_launch_id,
          banco: element.banco,
        };
      });
      receitas = balanceMonth.filter((element) => {
        if (element.movement == 1) {
          return element.value;
        }
      });
      despesas = balanceMonth.filter((element) => {
        if (element.movement == 2) {
          return element.value;
        }
      });
    }

    let valuesReceitas = receitas.map((element) => {
      return element.value;
    });

    let valuesDespesas = despesas.map((element) => {
      return element.value;
    });

    let receita = valuesReceitas.reduce((total, soma) => total + soma, 0);
    let despesa = valuesDespesas.reduce((total, soma) => total + soma, 0);

    const saldo = receita - despesa;

    if (balanceMonth) {
      return res.status(200).json({
        receita: receita ? receita : 0,
        despesa: despesa ? despesa : 0,
        saldo: saldo ? saldo : 0,
        data: data,
      });
    }
    return res.status(400).json({ msg: "Saldos não encontrados!" });
  },

  async donwnloadPdfBalance(req, res) {
    const { month, dateStart, dateEnd } = req.query;
    const uuid = req.headers.token;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    const [primaryDay] = await connection.query(`
      select generate_series ( '2022-01-01'::timestamp, '2022-12-01'::timestamp, '1 month'::interval) as "day1";
    `);
    const [lastDay] = await connection.query(`
      select (date_trunc('month', generate_series ( '2022-01-01'::timestamp, '2022-12-01'::timestamp, '1 month'::interval)) + interval '1 month' - interval '1 day') as "lastDay"
    `);

    const formatedDay1 = primaryDay.map((element, index) => {
      return {
        id: index,
        data: element.day1,
      };
    });
    const formatedDay2 = lastDay.map((element, index) => {
      return {
        id: index,
        data: element.lastDay,
      };
    });

    let formatedDay = [];

    formatedDay1.forEach((element) => {
      formatedDay2.forEach((element2) => {
        if (element.id == element2.id) {
          formatedDay.push({ inicio: element.data, final: element2.data });
        }
      });
    });

    let dateQuery = "";
    let monthQuery = "";

    if (month != -1) {
      const mes = Number(month);

      if (mes) {
        let dataInicio = moment(formatedDay[mes].inicio).format();
        let dataFinal = moment(formatedDay[mes].final).format();
        dateQuery = "";
        monthQuery = `and date_launch between '${dataInicio}' and '${dataFinal}'`;
      }
    }

    if (dateStart != "null" && dateEnd != "null") {
      let dataStart = moment(dateStart).format();
      let dataEnd = moment(dateEnd).format();
      monthQuery = "";
      dateQuery = `and date_launch between '${dataStart}' and '${dataEnd}'`;
    }

    const [balanceMonth] = await connection.query(
      `select 
        l.*, b.name_bank as banco,  c.description as categoria , c2.description as classificacao, sl.description as status
        from launch l 
        left join bank b on b.id = l.bank_id  	
        left join category c on c.id = l.category_id 
        left join classification c2 on c2.id = l.classification_id 
        left join status_launch sl on sl.id = l.status_launch_id 
        where l.id_user = ${user.id}
        ` +
        dateQuery +
        `
        ` +
        monthQuery +
        ` group by b.name_bank, l.id, b.id, c.id, c2.id, sl.description `
    );

    let data;
    let receitas = [];
    let despesas = [];
    if (balanceMonth.length > 0) {
      data = balanceMonth.map((element) => {
        return {
          descricao: element.description,
          data_inicial: element.date_launch
            ? moment(element.date_launch).format("DD/MM/yyyy")
            : "",
          movimentacao: element.movement == 1 ? "Receita" : "Despesa",
          categoria: element.categoria,
          classificacao: element.classificacao,
          valor: element.value,
          data_vencimento: element.date_venciment
            ? moment(element.date_venciment).format("DD/MM/yyyy")
            : "",
          status: element.status_launch_id,
          banco: element.banco,
        };
      });
      receitas = balanceMonth.filter((element) => {
        if (element.movement == 1) {
          return element.value;
        }
      });
      despesas = balanceMonth.filter((element) => {
        if (element.movement == 2) {
          return element.value;
        }
      });
    }

    let valuesReceitas = receitas.map((element) => {
      return element.value;
    });

    let valuesDespesas = despesas.map((element) => {
      return element.value;
    });

    let receita = valuesReceitas.reduce((total, soma) => total + soma, 0);
    let despesa = valuesDespesas.reduce((total, soma) => total + soma, 0);

    const saldo = receita - despesa;

    try {
      const html = await GenerateReport({
        data: {
          launchs: data,
          receita: receita,
          despesa: despesa,
          saldo: saldo,
          user: `${user.name} ${user.last_name}`,
        },
        MailBody: "pdf.ejs",
      });

      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });

      const page = await browser.newPage();
      await page.emulateTimezone("America/Sao_Paulo");

      await page.setContent(html);

      const report = await page.pdf({
        format: "A4",
        scale: 1,
        landscape: false,
        printBackground: true,
        margin: 3,
      });

      await browser.close();

      res.setHeader("Content-Disposition", `attachment; filename=teste_pv.pdf`);
      res.status(200).send(report);
    } catch (err) {
      return res.status(502).json({ msg: `Erro ao gerar pdf. ${err}` });
    }
  },
};
