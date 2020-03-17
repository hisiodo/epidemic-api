/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const LeftOver = use('App/Models/LeftOver');
class LeftOverController {
  async store({ request, response }) {
    const leftOver = await LeftOver.create(request.all());
    return response.status(201).json({ leftOver });
  }
}

exports.module = LeftOverController;
