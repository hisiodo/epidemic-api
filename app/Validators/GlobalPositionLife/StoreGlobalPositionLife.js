class StoreSession {
  get rules() {
    return {
      positions: 'required|array',
    };
  }

  get messages() {
    return {
      'positions.required': 'You must provide the positions .',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = StoreSession;
