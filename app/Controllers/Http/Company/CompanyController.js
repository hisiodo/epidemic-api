/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Company = use('App/Models/Company');
class CompanyController {
  async store({ request, response }) {
    const company = await Company.create(request.all());

    return response.status(201).json({ company });
  }
}

exports.module = CompanyController;
