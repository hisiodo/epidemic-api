class LifeException extends Error {
  constructor(message, object) {
    super();
    this.message = message;
    this.object = object;
  }
}

module.exports = LifeException;
