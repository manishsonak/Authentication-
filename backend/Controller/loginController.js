const Usermodel = require("../Models/Usermodel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.createUser = async (req,res)=>{

    try {
 
     const {name,email,username,password}=req.body;
 
     if(!name || !email || !username) return res.status(400).json({
      error: 'Please fill all the fields'
  
     })
 
      const uname = await Usermodel.findOne({username});
      if(uname) return res.status(400).json({
         error: 'User already exists with this email'
         })
      const mail = await Usermodel.findOne({email});
      if(mail) return res.status(400).json({
         error: 'User already exists with this email'
         })
 
        
 
         bcrypt.genSalt(10, function(err, salt) {
             bcrypt.hash(password, salt, async function(err, hash) {
                 
                 const newUser= await Usermodel.create({
                     name,email,username,password:hash
                    })
                 
                    if (!newUser) return res.status(400).json({
                     error: 'Something went wrong User Not Creted'
                    })
                    const templatedata={
                     username,
                     password
                    }
 
                
                
                    sendCookie(res,newUser,"User create Successfully");
             });
         });
  
   
  
   } catch (err) {
         res.status(500).json({
             error: err.message,
             message:"error"
         })
   }
 
 
 }
 

 module.exports.loginUser = async (req,res)=>{

    try {
 
     const {email,password} =req.body;
 
     if(!email || !password) return res.status(400).json({
      error: 'Please fill all the fields'
  
     })
 
      const find = await Usermodel.findOne({email});

      if (!find) {
       return res.status(400).json({
            message:"User not exist"
        })
      }
      

      bcrypt.compare(password, find.password, function(err, result) {
        
        // login and give jwt token
       
        
        if(!result) return res.status(400).json({
            error: 'Wrong Credintial'
        
           })

           sendCookie(res,find,"User login Successfully");

        
            //jwt token

    });
   
  
   } catch (err) {
         res.status(500).json({
             error: err.message,
             message:"error"
         })
   }
 
 
 }

  module.exports.logout=async(req,res)=>{

    try {

      
      if(!req.cookies.token){
       return res.status(200).json({
          message:"You are not logged in",
          
        })
    }
  
    res.clearCookie("token")
    res.status(200).json({
      message:"User Logout sucessfully"
    })
      
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message:"internal server error"
      })
    }
    }

    const sendCookie=(res,user,message)=>{

  
        const token=jwt.sign({id:user._id},process.env.SCREATE_KEY)
       
    
        res.cookie('token', token, { 
        httpOnly: true, 
        secure: true,         
    }).status(200).json({
          message:message,
          user:user,
          token:token,
        })
      }