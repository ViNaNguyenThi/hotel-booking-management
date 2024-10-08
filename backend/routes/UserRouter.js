const express = require("express");
const router = express.Router();
const userController = require('../controllers/UseControllers')


router.post('/create',userController.createUser);

module.exports = router;


