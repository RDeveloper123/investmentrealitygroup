const adminController = require('../controller/adminController')
const cmsController = require('../controller/cmsController')
const router = require('express').Router();

router
    .get('/get-cms ', cmsController.getCms)
    .post('/add-cms', adminController.addCms)
    .delete('/delete-cms/:id', adminController.deleteCms)

    // .get('/property-type', adminController.getType)
    // .post('/add-property-type', adminController.addType)
    // .put('/update-property-type/:id', adminController.updateType)
    // .delete('/delete-property-type/:id', adminController.deleteType)

    // .get('/property-status', adminController.getPropertyStatus)
    // .post('/add-property-status', adminController.addPropertyStatus)
    // .put('/update-property-status/:id', adminController.updatePropertyStatus)
    // .delete('/delete-property-status/:id', adminController.deletePropertyStatus)

    // .get('/get-property', adminController.)

    
    .post('/add-property',adminController.addProperty )
    .delete('/delete-property/:id',adminController.deleteProperty )

module.exports = router;