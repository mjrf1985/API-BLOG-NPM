const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();


router.get('/users', UserController.Get_users);
router.get('/user/:id', UserController.IdUsers);
router.put("/:id", UserController.update_user);
router.delete("/deleteuser/:id", UserController.delete_user);



module.exports = router;