const express = require("express");
const router = express.Router();
const userController = require("./../controllers/usuarios");


router.post('/new', userController.create);
router.put('/update/:id', userController.updateVet);
router.delete('/delete/:id', userController.deleteVet);
router.get('/admin/all', userController.getAll);


module.exports = router;
