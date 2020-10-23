
const { brand: brandModel } = require('../models/');

/**
 * List of Brand
 * @http_method GET
 * @param {*} req {params: page, limit }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const index = async (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const offset = page > 1 ? Math.ceil(limit / (page - 1)): 0;

  const data = await brandModel.findAll({ limit, offset });

  return res.json({
    status: 200,
    message: 'Ok',
    data
  })
}


/**
 * Get Brand by ID
 * @http_method GET
 * @param {*} req [Params =  page, limit ]
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const retrieve = async (req, res, next) => {
  const { id } = req.params;

  const data = await brandModel.findOne({ where: { id } });

  return res.json({
    status: 200,
    message: 'Ok',
    data
  })
}

/**
 * Insert Brand
 * @http_method POST
 * @param {*} req { body: id, name, logo, banner }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const store = (req, res, next) => {
  const { id, name, logo, banner } = req.body;
  const requestData = { id, name, logo, banner }

  brandModel
    .create(requestData)
    .then((data) => {
      return res.json({
        status: 201,
        message: 'Ok',
        data
      })
    })
    .catch((e) => {
      return next(e)
    })
    
}

/**
 * Update Brand
 * @http_method PUT
 * @param {*} req { body: id, name, logo, banner }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const update = (req, res, next) => {
  const { id } = req.params;
  const { name, logo, banner } = req.body;
  const requestData = { name, logo, banner };

  brandModel
    .update(requestData, { where: { id } })
    .then((data) => {
      return res.json({
        status: 201,
        message: 'Ok',
        data
      })
    })
    .catch((e) => {
      return next(e)
    })
}

/**
 * Remove Brand
 * @http_method PUT
 * @param {*} req { params: id }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const remove = (req, res, next) => {
  const { id } = req.params
  brandModel
    .destroy({ where:  { id } })
    .then(() => {
      return res.json({
        status: 200,
        message: 'Ok',
        data: null
      })
    })
}


module.exports = {
  index,
  retrieve,
  store,
  update,
  remove
}
