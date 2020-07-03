module.exports = function checkStatushealth(value) {
  if (value <= 10) {
    return 'risco baixo';
  }
  if (value > 10 && value <= 20) {
    return 'risco médio';
  }
  if (value > 20) {
    return 'risco alto';
  }
};
