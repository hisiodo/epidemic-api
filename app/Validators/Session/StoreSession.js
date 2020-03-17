'use strict'

class StoreSession {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required'
    }
  }
  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password'
    }
  }
}

module.exports = StoreSession
