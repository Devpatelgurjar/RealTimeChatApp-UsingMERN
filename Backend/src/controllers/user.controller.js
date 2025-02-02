import bcrypt from "bcryptjs";
import User from '../models/user.model.js';
import {generateToken} from '../lib/utils.js';
import cloudinary from '../lib/Cloudinary.js';
export const signup = async(req,res)=>{
    
    const{name,email,password,profilePic}=req.body;
    try {
        if(!name||!email||!password){
        return res.status(422).json({error:"Please fill all the fields."});
};
    if(password.length<6){
       return res.status(422).json({error:"Password must be at least 6 characters long."});
    }

    const user = await User.findOne({email});
    if(user){
        return res.status(422).json({error:"User already exists with this email."});
    }

     const salt= await bcrypt.genSalt(10);
     const hashedPassword= await bcrypt.hash(password,salt);

     const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePic
      });
      if (newUser) {
        // generate jwt token here
        generateToken(newUser._id, res);
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    }
     catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


export const login =async(req,res)=>{
    const {email,password}=req.body;
    try {
      if(!email||!password){
        return res.status(400).json({error:"Please fill all the fields."});
      }
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"invalid credentials."});
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({error:"Invalid credentials."});
      }
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      }); 

    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "internal server error" });
    }
};


export const logout =(req,res)=>{
   try {
     res.cookie("jwt","",{maxAge:0});
     res.status(200).json({message:"Logged out successfully"});
   } catch (error) {
     console.log("Error in logout controller", error.message);
   }
};

export const checkAuth =(req,res)=>{
  try {
    res.status(200).json(req.user); // just check if the user is legal or not if the user is authenthicated by the protected route then it legal user
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: "Profile picture is required." });
      }

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          async (error, result) => {
              if (error) {
                  console.error("Cloudinary upload error:", error);
                  return res.status(500).json({ error: "Cloudinary upload failed" });
              }

              // Update user in DB
              const userId = req.user._id;
              const updatedUser = await User.findByIdAndUpdate(
                  userId,
                  { profilePic: result.secure_url },
                  { new: true }
              );

              res.status(200).json(updatedUser);
          }
      );

      uploadResponse.end(req.file.buffer); // ✅ Send file buffer to Cloudinary
  } catch (error) {
      console.error("Error in updateProfile", error.message);
      res.status(500).json({ message: "Internal Server Error" });
  }
};