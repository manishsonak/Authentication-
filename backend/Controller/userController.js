const Usermodel = require("../Models/Usermodel")
module.exports.allUsers = async (req, res) => {
    try {
    //   const id = req.user;
      const user = await Usermodel.find().select('-password');
      if (!user)
        return res.status(500).json({
          message: "No users found",
        });
      res.status(200).json({
        message: "users found",
        user: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error fetching users",
        error: err,
      });
    }
  };

  module.exports.DeletePost = async (req, res) => {
    try {
      
      const userId = req.params.id;
      const user = await Usermodel.findById(userId);
      if (!user)
        return res.status(500).json({
          message: "User not found",
        });

       await user.deleteOne({ _id: userId });
     
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error deleting User",
        error: err,
      });
    }
  };

  module.exports.EditPost = async (req, res) => {
    try {

        const {name,email,username}=req.body

        // const uname = await Usermodel.findOne({username});
        // if(uname) return res.status(400).json({
        //    error: 'User already exists with this username'
        //    })
        // const mail = await Usermodel.findOne({email});
        // if(mail) return res.status(400).json({
        //    error: 'User already exists with this email'
        //    })

    
      const userId = req.params.id;
      const user = await Usermodel.findById(userId);
      if (!user)
        return res.status(500).json({
          message: "User not found",
        });
     
      user.name = name || user.name;
      user.email = email || user.email;
      user.username=username || user.username
      await user.save();
      res.status(200).json({
        message: "Post updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error updating post",
        error: err,
      });
    }
  };