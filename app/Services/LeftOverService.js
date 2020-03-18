/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const LeftOver = use('App/Models/LeftOver');

class LeftOverService {
  static async store(reference) {
    const instanveLeftOver = { value: 0, seller_id: reference };

    await LeftOver.create(instanveLeftOver);
  }
}

module.exports = LeftOverService;
