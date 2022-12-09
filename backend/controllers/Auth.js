const User = require("../model/User")
const bcrypt = require("bcrypt")



const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
    
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
        })
    
        const user = await newUser.save()
        res.status(200).json(user)
      } catch (error) {
        res.status(500).json(error)
      }
}


const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        //if no user
        if(!user) {
            res.status(400).json({status: 'Usuario incorrecto'});
        }
    
        //if same user then compare password
        const validatePasswordHashed = await bcrypt.compare(req.body.password, user.password)
        //if not validate
        if(!validatePasswordHashed) {
            res.status(400).json({status: 'Clave incorrecta vuelve a intentarlo'})
        }
    
        const { password, ...other } = user._doc
        res.status(200).json(other)
      } catch (error) {
        res.status(500).json(error)
      }
}


module.exports = { register, login };