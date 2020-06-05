/* eslint-disable yoda */
module.exports = function checkStatushealth(value) {
  if (1 <= value <= 10) {
    return 'risco baixo';
  }
  if (10 < value <= 20) {
    return 'risco médio';
  }
  if (20 < value <= 30) {
    return 'risco alto';
  }
};
