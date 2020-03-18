/* eslint-disable no-empty-pattern */
const Compute = require('../Compute');

class ComputeLeftOverUp extends Compute {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  async compute(object) {
    const { value, leftOverInstance } = { ...object };

    const currentValue = leftOverInstance.$attributes.value;

    const updatedValue = value + currentValue;
    await leftOverInstance.merge({
      value: updatedValue,
    });
    await leftOverInstance.save();

    return leftOverInstance;
  }
}

module.exports = ComputeLeftOverUp;
