/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const SymptomsHistory = use('App/Models/SymptomsHistory');
const checkStatushealth = require('./CalculateStatus');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Life = use('App/Models/Life');

class SymptomsHistoryController {
  async store({ request, response, auth }) {
    const dataRequest = request.all();

    const { user } = auth;

    const life = await Life.findBy('user_id', user.id);

    if (!life) {
      return response.status(400).json({ error: 'Vida Inexistente' });
    }
    const { data } = dataRequest;

    const { value, symptoms } = data;

    try {
      const status = checkStatushealth(value);
      console.log(status);
      await SymptomsHistory.create({
        symptoms,
        status,
        life_id: life.id,
      });
    } catch (error) {
      console.log(error);
    }

    return response.status(201).json({ ok: 'Sintomas Atualizados' });
  }
}

module.exports = SymptomsHistoryController;
