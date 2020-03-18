class StoreSeller {
  get rules() {
    return {
      name: 'required|string|max:50',
      lastName: 'required|string|max:50',
      user_id: 'required|number',
      company_id: 'required|number',
    };
  }

  get messages() {
    return {
      'name.required': 'You must provide a name.',
      'last_name.required': 'You must provide a last_name.',
      'name.max': 'You must provide a name max 50 characters.',
      'last_name.max': 'You must provide a last_name max 50 characters.',
      'user_id.required': 'You must provide a user reference',
      'company_id.required': 'You must provide a company reference',
      'user_id.number': 'You must provide a number to user reference',
      'company_id.number': 'You must provide a number to company reference',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = StoreSeller;
