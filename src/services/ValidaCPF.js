/* eslint-disable no-redeclare */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */

module.exports = {
  async ValidaCPF(CPF) {
    const cpfNumbers = CPF.replace(/\.|-/g, "");

    if (
      cpfNumbers == "00000000000" ||
      cpfNumbers == "11111111111" ||
      cpfNumbers == "22222222222" ||
      cpfNumbers == "33333333333" ||
      cpfNumbers == "44444444444" ||
      cpfNumbers == "55555555555" ||
      cpfNumbers == "66666666666" ||
      cpfNumbers == "77777777777" ||
      cpfNumbers == "88888888888" ||
      cpfNumbers == "99999999999"
    ) {
      return false;
    }

    var count = 0;
    var pointer = 10;

    for (const index in cpfNumbers) {
      if (index < 9) {
        var value = parseInt(cpfNumbers[index], 10) * pointer;
        count += parseInt(value, 10);
        pointer--;
      } else if (index == 9) {
        const digit1 = count % 11;
        if (digit1 < 2) {
          var digit1final = 0;
          count += digit1final;
        } else {
          var digit1final = 11 - digit1;
          count += digit1final;
        }
      }
    }
    const newCpfNumbers = `${cpfNumbers.slice(0, 9)}${digit1final}`;
    var count = 0;
    var pointer = 11;
    for (const index2 in newCpfNumbers) {
      if (index2 < 10) {
        var value = newCpfNumbers[index2] * pointer;
        count += parseInt(value, 10);
        pointer--;
        if (index2 == 9) {
          var digit2 = count % 11;
          var digit2final = digit2 < 2 ? (digit2final = 0) : 11 - digit2;
        }
      }
    }
    if (cpfNumbers == `${cpfNumbers.slice(0, 9)}${digit1final}${digit2final}`) {
      return true;
    }

    return false;
  },
};
