const myModel = require('../model/userModel');
const bcrypt = require('bcrypt-inzi');
const jwt = require('../middleware/jwdMiddleware');

exports.createUser = async (req, res)=>{
    try {
        const {name,email,password} = req.body;
        const existing = await myModel.findOne({email})
        if (existing){
            return res.status(400).json({message:"User already registered"});
        }
        if(!name||!email||!password){
            return res.status(400).json({message:"All fields required"});
        }
        const hashpwsd = await bcrypt.stringToHash(password, 10);

        const user = await new myModel({
            name,
            email,
            password:hashpwsd
        })
        await user.save();
        const token = jwt.sign(req.body);
        return res.status(200).json({token});
    }catch(error) {
        return res.status(500).json({message:"Internal Server Error"});
    }

}

exports.login = async (req, res)=>{
    try {
        const {email,password} = req.body;
        // find user if avaliable
        const user = await myModel.findOne({email});
        // verifyHash
        const verifyHash = await bcrypt.varifyHash(password,user.password);
        if(!verifyHash){
            return res.status(400).json({message: "Wrong Password"});
        }
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message: "Internal Server Error", error:error.message});
    }
}