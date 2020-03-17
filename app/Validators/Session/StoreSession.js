class StoreSession {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = StoreSession;
