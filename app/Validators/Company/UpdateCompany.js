class UpdateCompany {
  get rules() {
    return {
      social_name: 'string',
      social_number: 'string|max:14|min:11|unique:companies',
    };
  }

  get messages() {
    return {
      'social_number.max': 'Tha max number is 14',
      'social_number.min': 'Tha max number is 11',
      'social_number.unique': 'This social_number is already registered.',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = UpdateCompany;
