const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createError = require('../utils/appError');

// REGISTER USER

exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return next(new createError('User already exists!', 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
        ...req.body,
        password:hashedPassword,
    });

    // Assign JWT (json web token) to user
    const token = jwt.sign({userId: newUser._id}, 'secretkey123', {
        expiresIn: '90d',
    });
    
    res.status(201).json({
        status: 'success',
        message: 'User registered sucessfully',
        token,
       
    });
  } catch (error) {
    
    next(error);
  }
};

//logging user
exports.login = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if (!user)return next(new createError('User not found!',404));
        const ispassValid = await bcrypt.compare(password,user.password);

        if(!ispassValid){
            return next(new createError('invalid email or password!',401));
        }
        const token = jwt.sign({userId: user._id}, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status:'success',
            token,
            message:'logged in successfully',
            user:{
                _id: user._userId,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        })
    }
    catch(error){
        next(error);
    }
};