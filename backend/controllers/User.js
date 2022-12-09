const User = require("../model/User")
const Post = require("../model/Post")
const bcrypt = require("bcrypt")



const Get_users = (req, res) => {
    User.find((err, users) => {
        if(!err) {
            res.status(200).json(users);
        }else {
            res.status(400).send(err.message);
        }
    })
}

const IdUsers = (req, res) => {
    User.findById(req.params.id,(err, users) => {
        if(!err) {
            res.status(200).json(users);
        }else {
            res.status(400).send(err.message);
        }
    })
}


const update_user = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          )
          res.status(200).json(updatedUser)
        } catch (error) {
          res.status(500).json(error)
        }
      } else {
        res.status(401).json("Solo puedes actualizar tu cuenta en el frontend")
      }
}

const delete_user = async (req, res) => {
  const id = req.params.id;
  try {
    const Delete_Data_User = await User.findByIdAndDelete(id);
    if(!Delete_Data_User) {
      res.status(400).json({status: "ocurrio un problema"})
    }
    res.status(200).json({status: 'Usuario eliminado'})
  } catch (error) {
    
  }
}
module.exports = { Get_users, IdUsers, update_user, delete_user };