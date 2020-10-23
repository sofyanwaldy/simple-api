const { brand: brandModel, product: productModel } = require('../models');

/**
 * List of brand products
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
  const product = await brandModel.findOne({
    where : { id :brandID }, 
    include: [{ model: productModel, limit, offset }] 
  });

 return res.json({
    status: 200,
    message: 'OK product',
    data: product
  });
}

/**
 * Get brand Product by productID
 * @http_method GET
 * @param {*} req {params: page, limit }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const retrieve = async (req, res, next) => {
  const { brandID, productID } = req.params;
  const dataBrand = await brandModel.findOne({ where: {id: brandID} });
  if (! dataBrand) return next();
  const dataproduct = await productModel.findOne({ where : { id: productID }});
  if (!dataproduct) return next();

 return res.json({
    status:200,
    message: 'Ok',
    data: dataproduct
  });
}

/**
 * Insert Brand product by productID
 * @http_method GET
 * @param {*} req {params: page, limit }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const store = async (req, res, next) => {
  const { brandID } = req.params;
  const { id, name, picture, price } = req.body;
  const requestData = {
    id,
    name, 
    picture,
    price,
    brandId: brandID
  };

  productModel
    .create(requestData)
    .then((data) => {
     return res.json({
        status: 200,
        message: 'OK product',
        data
      });
    })
    .catch((e) => {
      next(e)
    });
}

/**
 * Update product by productID
 * @http_method GET
 * @param {*} req {params: page, limit }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const update = async (req, res, next) => {
  const { brandID, productID } = req.params;
  const { name, picture, price } = req.body;
  const requestData = {
    name, 
    picture,
    price,
    brandId: brandID
  };
  productModel
    .update(requestData, { where: { id: productID } })
    .then(() => {
     return res.json({
        status: 200,
        message: 'OK product',
        data: requestData
      });
    })
    .catch((e) => {
      next(e)
    });
}

/**
 * delete brand Product by productID
 * @http_method GET
 * @param {*} req {params: page, limit }
 * @param {*} res 
 * @param {*} next 
 * @return Json
 */
const remove = async (req, res, next) => {
  const { brandID, productID } = req.params;
  const getBrand = await brandModel.findOne({ where: {id : brandID} });
  if (! getBrand) return next();

  const deletedproduct = await productModel.destroy({ where: { id: productID } });
  if (! deletedproduct) return next()

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