/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const LeftOver = use('App/Models/LeftOver');
const ComputeLeftOver = require('../../../Services/Compute/ComputeContext/ComputeLeftOver');

class LeftOverController {
  async update({ request, response, params }) {
    const { id } = params;
    const { operation, value } = request.only(['operation', 'value']);
    const leftOverInstance = await LeftOver.findOrFail(id);
    const computeOperation = { value, leftOverInstance };
    if (operation === 'down' && value > leftOverInstance.value) {
      return response.status(401).json({
        permission: 'você não pode usar mais credito que o permitido',
      });
    }

    ComputeLeftOver.executeOperation(operation).compute(computeOperation);
    return response.status(200).json({ leftOverInstance });
  }
}

module.exports = LeftOverController;
