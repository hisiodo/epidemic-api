/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Seller = use('App/Models/Seller');
class SellerController {
  async index({ response }) {
    const sellers = await Seller.query()
      .with('user')
      .with('company')
      .fetch();
    return response.status(200).json({ sellers });
  }

  async show({ response, params }) {
    const seller = await Seller.findOrFail(params.id);
    if (!seller) {
      return response.status(400).json({ error: 'Seller does not exist' });
    }
    return response.status(200).json({ seller });
  }

  async store({ request, response }) {
    const seller = await Seller.create(request.all());

    await seller.load('user');
    await seller.load('company');

    return response.status(201).json({ seller });
  }

  async update({ request, response, params }) {
    const dataRequest = request.all();
    if (!dataRequest) {
      return response.status(400).send({ error: 'Data not received' });
    }
    const seller = await Seller.findOrFail(params.id);
    if (!seller) {
      return response.status(400).json({ error: 'Seller does not exist' });
    }
    await seller.merge(dataRequest);
    await seller.save();
    return response.status(200).json({ seller });
  }

  async destroy({ response, params }) {
    const seller = await Seller.findOrFail(params.id);
    if (!seller) {
      return response.status(400).json({ error: 'Seller does not exist' });
    }
    await seller.delete();
    return response.status(200).json({ delete: 'Seller deleted with sucess' });
  }
}

module.exports = SellerController;
