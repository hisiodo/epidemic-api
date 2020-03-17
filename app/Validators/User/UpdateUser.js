class StoreUser {
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
}

module.exports = StoreUser;
