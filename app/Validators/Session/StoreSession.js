class StoreSession {
  get rules() {
    return {
      identifier: 'required|string',
      password: 'required',
    };
  }

  get messages() {
    return {
      'identifier.required': 'Você deve fornecer um identificador',
      'password.required': 'Você deve fornecer um password',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = StoreSession;
