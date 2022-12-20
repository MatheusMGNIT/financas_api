const connection = require("../../database/index");
const moment = require("moment");
const puppeteer = require("puppeteer");
const { GenerateReport } = require("../../services/GenerateReport");

module.exports = {
  async getBalanceMonth(req, res) {
    const mes = 11;
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

    const dataInicio = moment(formatedDay[mes].inicio).format();
    const dataFinal = moment(formatedDay[mes].final).format();

    const [balanceMonth] = await connection.query(
      `select * ,
        (select sum(value) from launch l where  movement = 1) as receitas ,
        (select sum(value) from launch l where  movement = 2) as despesas
        from launch l 
        where date_launch between '${dataInicio}' and '${dataFinal}' 
        group by 1
        `
    );

    let data, receita, despesa;
    if (balanceMonth.length > 0) {
      data = balanceMonth.map((element) => {
        return {
          descricao: element.description,
          data_inicial: element.date_launch,
          movimentacao: element.movement,
          categoria: element.category_id,
          classificao: element.classification_id,
          valor: element.value,
          data_vencimento: element.date_venciment,
          status: element.status_launch_id,
          banco: element.bank_id,
        };
      });
      [receita] = balanceMonth.map((element) => {
        return element.receitas;
      });

      [despesa] = balanceMonth.map((element) => {
        return element.despesas;
      });
    }

    const saldo = receita - despesa;

    if (balanceMonth) {
      return res.status(200).json({
        receita: receita ? receita : 0,
        despesa: despesa ? despesa : 0,
        saldo: saldo ? saldo : 0,
        data: data ? data : [],
      });
    }
    return res.status(400).json({ msg: "Saldos não encontrados!" });
  },

  async donwnloadPdfBalance(req, res) {
    const mes = 11;
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

    const dataInicio = moment(formatedDay[mes].inicio).format();
    const dataFinal = moment(formatedDay[mes].final).format();

    const [balanceMonth] = await connection.query(
      `select * ,
        (select sum(value) from launch l where  movement = 1) as receitas ,
        (select sum(value) from launch l where  movement = 2) as despesas
        from launch l 
        where date_launch between '${dataInicio}' and '${dataFinal}' 
        group by 1
        `
    );

    let data, receita, despesa;
    if (balanceMonth.length > 0) {
      data = balanceMonth.map((element) => {
        return {
          descricao: element.description,
          data_inicial: element.date_launch,
          movimentacao: element.movement,
          categoria: element.category_id,
          classificao: element.classification_id,
          valor: element.value,
          data_vencimento: element.date_venciment,
          status: element.status_launch_id,
          banco: element.bank_id,
        };
      });
      [receita] = balanceMonth.map((element) => {
        return element.receitas;
      });

      [despesa] = balanceMonth.map((element) => {
        return element.despesas;
      });
    }

    const saldo = receita - despesa;

    try {
      const html = await GenerateReport({
        data: {
          // data: data,
          receita: receita,
          despesa: despesa,
          saldo: saldo,
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
