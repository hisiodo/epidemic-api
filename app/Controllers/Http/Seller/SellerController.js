/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Seller = use('App/Models/Seller');
class SellerController {
  async store({ request, response }) {
    const seller = await Seller.create(request.all());
    return response.status(201).json({ seller });
  }
}

exports.module = SellerController;
