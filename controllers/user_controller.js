
const JWT_SECRET = process.env.JWT_SECRET;
import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';



export const  signup = async (req , res)=>{
    try{
         const {name , email , password} = req.body;
          let newUser = await User.create([
             {name , email , password}
            ]);
         res.status(201).json({message:"signup Successfully" , newUser});

    }
    catch(err){
        res.status(500).send("internal server error");
    }
}
export const login = async (req , res)=>{
    try{
        const {email , password} = req.body;
       const user =  await User.find({email , password});
       const token = jwt.sign({id:user._id , email:user.email} , JWT_SECRET);
       res.status(200).json({message:"login Successfully" , user , token});

    }
    catch(err){
        res.status(500).send("internal server error");
    }
}


export const authenticationToken = (req , res , next)=>{
       const token  = req.headers.token;
       if(token){
        const decode = jwt.verify(token , JWT_SECRET);
        req.user = decode;
        next();
       }
       else{
        res.status(401).json({message:"Token is not provided"});
       }
}



