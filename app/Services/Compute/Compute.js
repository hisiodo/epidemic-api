class Compute {
  constructor() {
    if (this.constructor === Compute) {
      throw new TypeError(
        'Abstract class "Compute" cannot be instantiated directly.'
      );
    }

    if (this.compute === undefined) {
      throw new TypeError('Classes extending the Compute abstract class');
    }
  }

  async compute(object) {
    return object;
  }
}
module.exports = Compute;
