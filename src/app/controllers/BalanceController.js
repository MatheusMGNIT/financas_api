const connection = require("../../database/index");

module.exports = {
  async getBalanceMonth(req, res) {
    const [balanceMonth] = await connection.query(
      `select 
      (select sum(value) from launch l where  movement = 1) as receitas ,
      (select sum(value) from launch l where  movement = 2) as despesas
      from launch l 
      group by 1`
    );

    const [receita] = balanceMonth.map((element) => {
      return element.receitas;
    });

    const [despesa] = balanceMonth.map((element) => {
      return element.despesas;
    });

    if (balanceMonth) {
      return res.status(200).json(saldo);
    }
    return res.status(400).json({ msg: "Saldo não encontrado!" });
  },

  async getRevenue(req, res) {
    const [revenueMonth] = await connection.query(
      `select sum(value) 
      from launch  
      and movement = 1
       `
    );

    if (revenueMonth) {
      return res.status(200).json(revenueMonth);
    }
    return res.status(400).json({ msg: "Saldo de Receitas não encontrado!" });
  },
  async getExpense(req, res) {
    const [expenseMonth] = await connection.query(
      `select sum(value) 
      from launch  
      and movement = 2
       `
    );

    if (expenseMonth) {
      return res.status(200).json(expenseMonth);
    }
    return res.status(400).json({ msg: "Saldo de Despesas não encontrado!" });
  },
};
