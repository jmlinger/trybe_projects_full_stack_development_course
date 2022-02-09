const Services = require('../../services/categories');

module.exports = async (req, res, _next) => {
  const category = req.body;
  console.log(category);
  const result = await Services.create(category);

  return res.status(result.status)
    .json(typeof result.message !== 'object'
      ? { message: result.message }
      : result.message);
};
