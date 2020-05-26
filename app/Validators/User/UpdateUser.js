class UpdateUser {
  get rules() {
    return {
      identifier: 'string|unique:users',
      password: 'required',
    };
  }

  get messages() {
    return {
      'identifier.email': 'You must provide a valid email address.',
      'identifier.unique': 'This email is already registered.',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = UpdateUser;
