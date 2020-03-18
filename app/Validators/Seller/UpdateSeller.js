class UpdateSeller {
  get rules() {
    return {
      name: 'string|max:50',
      last_name: 'string|max:50',
      user_id: 'number',
      company_id: 'number',
    };
  }

  get messages() {
    return {
      'name.max': 'You must provide a name max 50 characters.',
      'last_name.max': 'You must provide a last_name max 50 characters.',
      'user_id.number': 'You must provide a number to user reference',
      'company_id.number': 'You must provide a number to company reference',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = UpdateSeller;
