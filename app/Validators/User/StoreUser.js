class StoreUser {
  get rules() {
    return {
      identifier: 'required|string|unique:users',
      password: 'required',
    };
  }

  get messages() {
    return {
      'identifier.required': 'You must provide a email address.',
      'identifier.unique': 'This identifier is already registered.',
      'password.required': 'You must provide a password',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = StoreUser;
