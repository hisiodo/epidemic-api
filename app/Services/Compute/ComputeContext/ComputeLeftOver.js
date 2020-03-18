/* eslint-disable no-empty-pattern */
const ComputeLeftOverDown = require('./ComputeLeftOverDown');
const ComputeLeftOverUp = require('./ComputeLeftOverUp');

class ComputeLeftOver {
  static executeOperation(operation) {
    switch (operation) {
      case 'down':
        return new ComputeLeftOverDown();
      case 'sum':
        return new ComputeLeftOverUp();
      default:
        throw new Error('Strategy not found');
    }
  }
}

module.exports = ComputeLeftOver;
