const { brand: brandModel, outlet: outletModel } = require('../models');

/**
 * List of brand outlets
 * @http_method GET
 * @param {*} req {params: page, limit }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const index = async (req, res) => {
  const { brandID } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = page > 1 ? Math.ceil(limit / (page - 1)): 0;
  const outlet = await brandModel.findOne({
    where : { id :brandID }, 
    include: [{ model: outletModel, limit, offset }] 
  });

  return res.json({
    status: 200,
    message: 'OK Outlet',
    data: outlet
  });
}

/**
 * Get brand outlets by outletID
 * @http_method GET
 * @param {*} req {params: page, limit }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const retrieve = async (req, res, next) => {
  const { brandID, outletID } = req.params;
  const dataBrand = await brandModel.findOne({ where: { id: brandID }});
  if (! dataBrand) return next();
  const dataOutlet = await outletModel.findOne({ where : { id: outletID }});
  if (!dataOutlet) return next();

  return res.json({
    status:200,
    message: 'Ok',
    data: dataOutlet
  });
}

/**
 * Insert Brand Outlet
 * @http_method POST
 * @param {*} req { body: id, name, logo, banner }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const store = async (req, res, next) => {
  const { brandID } = req.params;
  const { id, name, picture, address, longitude, latitude } = req.body;
  const requestData = {
    id,
    name, 
    picture,
    address,
    longitude,
    latitude,
    brandId: brandID
  };

  outletModel
    .create(requestData)
    .then((data) => {
      return res.json({
        status: 200,
        message: 'OK Outlet',
        data
      });
    })
    .catch((e) => {
      next(e)
    });
}

/**
 * Update Brand outlet
 * @http_method PUT
 * @param {*} req { body: id, name, logo, banner }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */

const update = async (req, res, next) => {
  const { brandID, outletID } = req.params;
  const { name, picture, address, longitude, latitude } = req.body;
  const requestData = {
    name, 
    picture,
    address,
    longitude,
    latitude,
    brandId: brandID
  };
  outletModel
    .update(requestData, { where: { id: outletID } })
    .then(() => {
      return res.json({
        status: 200,
        message: 'OK Outlet',
        data: requestData
      });
    })
    .catch((e) => {
      next(e)
    });
}

/**
 * Remove Brand outlet
 * @http_method PUT
 * @param {*} req { body: id, name, logo, banner }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const remove = async (req, res, next) => {
  const { brandID, outletID } = req.params;
  const getBrand = await brandModel.findOne({ where: {id : brandID} });
  if (! getBrand) return next();

  const deletedOutlet = await outletModel.destroy({ where: { id: outletID } });
  if (! deletedOutlet) return next()

  return res.json({
    status: 200,
    message: 'Ok',
    data: null
  })

}

module.exports = {
    index,
    retrieve,
    store,
    update,
    remove
}