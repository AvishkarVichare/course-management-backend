const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdminController = async(req, res)=>{
try{
    const {email, username, password} = req.body;
    const admin = await Admin.findOne({$or:[{username},{email}]});
    if(admin){
        throw new Error("user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
        email,
        username,
        password: encryptedPassword
    })

    const data = {
        id: newAdmin.id,
        isAdmin: newAdmin.isAdmin
    }

    const token =  jwt.sign(data, 'shhh');

    const creatAdmin = newAdmin;
    creatAdmin.password = undefined;

    res.status(200).json({
        success: true,
        token,
        message: 'created'
    })



}catch(err){
    res.status(401).json({
        success: false,
        message: err.message,
    })
}
}

// login admin
exports.loginAdminController = async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
  
      if (!admin) {
        throw new Error('Admin not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        throw new Error('Incorrect password');
      }
  
      const data = {
        id: admin._id,
        isAdmin: true, 
      };
  
      const token = jwt.sign(data, 'shhh');
  
      res.status(200).json({
        success: true,
        token,
        message: 'Login successful',
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };


