/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Company = use('App/Models/Company');
class CompanyController {
  async index({ response }) {
    const companies = await Company.all();
    return response.status(200).json({ companies });
  }

  async show({ response, params }) {
    const company = await Company.findOrFail(params.id);
    if (!company) {
      return response.status(400).json({ error: 'Company does not exist' });
    }
    return response.status(200).json({ company });
  }

  async store({ request, response }) {
    const company = await Company.create(request.all());
    return response.status(201).json({ company });
  }

  async update({ request, response, params }) {
    const dataRequest = request.all();
    if (!dataRequest) {
      return response.status(400).send({ error: 'Data not received' });
    }
    const company = await Company.findOrFail(params.id);
    if (!company) {
      return response.status(400).json({ error: 'Company does not exist' });
    }
    await company.merge(dataRequest);
    await company.save();
    return response.status(200).json({ company });
  }

  async destroy({ response, params }) {
    const company = await Company.findOrFail(params.id);
    if (!company) {
      return response.status(400).json({ error: 'Company does not exist' });
    }
    await company.delete();
    return response.status(200).json({ delete: 'Company deleted with sucess' });
  }
}

module.exports = CompanyController;
