class UpdateUser {
  get rules() {
    return {
      email: 'email|unique:users',
      password: 'required',
      authorized: 'boolean',
    };
  }

  get messages() {
    return {
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'authorized.boolean': 'This value shuold be a boolean',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = UpdateUser;
