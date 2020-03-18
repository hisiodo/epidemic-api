class StoreLeftOver {
  get rules() {
    return {
      value: 'required|number',
      seller_id: 'required|number',
    };
  }

  get messages() {
    return {
      'value.required': 'You must provide a value.',
      'seller_id.required': 'You must provide a seller.',
      'value.number': 'You must provide a value as a number.',
      'seller_id.number': 'You must provide a seller id as a number.',
    };
  }

  async fails(error) {
    return this.ctx.response.status(400).send({ validation: error });
  }
}

module.exports = StoreLeftOver;
