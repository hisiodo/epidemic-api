class StoreUser {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      authorized: 'boolean|required',
    };
  }

  get messages() {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'authorized.required': 'You must provide a authorized value.',
      'authorized.boolean': 'This value shuold be a boolean',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = StoreUser;
