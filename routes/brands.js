const express = require('express');
const router  = express.Router();
const brandControllers  = require('../controllers/brandControllers')
const outletControllers = require('../controllers/outletControllers');
const productControllers =  require('../controllers/productControllers');

// brand router
router.get('/', brandControllers.index);
router.get('/:id(\\d+)$/', brandControllers.retrieve);
router.post('/', brandControllers.store);
router.put('/:id(\\d+)$/', brandControllers.update);
router.patch('/:id(\\d+)$/', brandControllers.update);
router.delete('/:id(\\d+)$/', brandControllers.remove);

// brand Outlets
router.get('/:brandID(\\d+)/outlets', outletControllers.index);
router.get('/:brandID(\\d+)/outlets/:outletID(\\d+)/', outletControllers.retrieve);
router.post('/:brandID(\\d+)/outlets', outletControllers.store);
router.put('/:brandID(\\d+)/outlets/:outletID(\\d+)', outletControllers.update);
router.delete('/:brandID(\\d+)/outlets/:outletID(\\d+)/', outletControllers.remove)


// brand Products
router.get('/:brandID(\\d+)/products', productControllers.index);
router.get('/:brandID(\\d+)/products/:productID(\\d+)/', productControllers.retrieve);
router.post('/:brandID(\\d+)/products', productControllers.store);
router.put('/:brandID(\\d+)/products/:productID(\\d+)', productControllers.update);
router.delete('/:brandID(\\d+)/products/:productID(\\d+)/', productControllers.remove)

module.exports = router;