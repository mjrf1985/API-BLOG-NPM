const express = require('express');
const CategoriesController = require('../controllers/Categories');
const router = express.Router();

router.post("/", CategoriesController.New_Category);
router.get("/categories", CategoriesController.Get_Caterories);
router.get("/:id", CategoriesController.CategoriesId);
router.put('/update/:id', CategoriesController.Update_Category);
router.delete('/delete/:id', CategoriesController.Delete_Category);

module.exports = router
