const Category = require("../model/Category")



const New_Category = async (req, res) => {
    const {name} = req.body;
    const new_Category = new Category({
        name
    });
    try {
        const obtener_data_Category = await new_Category.save();
        if(!obtener_data_Category){
            res.status(400).json({status: 'No se pudo crear la Categoria :('})
        }
        res.status(200).json({status: 'Categoria registrada con exito | :)'})
    } catch (error) {
        
    }
}

const Get_Caterories = async (req, res) => {
    Category.find((err, categories) => {
        if(!err){
            res.status(200).json(categories);
        }else {
            res.status(400).send(err.message);
        }
    })
}

const CategoriesId = (req, res) => {
    Category.findById(req.params.id,(err, categories) => {
        if(!err) {
            res.status(200).json(categories);
        }else {
            res.status(400).send(err.message);
        }
    })
}


const Update_Category = async (req, res) => {
    const { name } = req.body;
    const id = req.params.id;
    const data_update_Categories = ({
        name
    });
    const opciones = {opciones: true};

    try {
        const update_Categories = await Category.findByIdAndUpdate(
            id, data_update_Categories, opciones
        );
        if(!update_Categories) {
            res.status(400).json({status: 'No es posible actaulizar la categoria'})
        }
        res.status(200).json({status: 'Categoria actualizada'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const Delete_Category = async (req, res) => {
    const id = req.params.id;
    try {
        const save_Delete_Category_Id = await Category.findByIdAndDelete(
            id
        );
        if(!save_Delete_Category_Id) {
            res.status(400).json({status: 'Upss ocuurio un error'})
        } 
        res.status(200).json({status: 'Cateroria Eliminada'})
    } catch (error) {
        res.status(400).send(error.message);
    }
}




module.exports = { New_Category, Get_Caterories, CategoriesId, Update_Category, Delete_Category  };