const Portfolio = require("../models/portfolio");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const portfolioResolversQuery = {
  hello:()=> "welcome",
  portfolio:async (root,{id})=>{
    return await Portfolio.findById(id);
  },
  portfolios:async ()=>{
    return await Portfolio.find({});
  },
  
}
const portfolioResolversMutation = {
  createPortfolio:async (root,{input})=>{
    const newPortfolio = await Portfolio.create(input);
    return newPortfolio;
  },
  updatePortfolio:async (root,{id,input})=>{
    const newPortfolio = await Portfolio.findByIdAndUpdate(id,input,{new:true});
    return newPortfolio;
  },
  deletePortfolio:async (root,{id})=>{
    await Portfolio.findByIdAndDelete(id);
    return "deleted successfully"
  }
}

const userResolversMutation = {
  signUp:async(root,{input})=>{
    if(input?.password !== input?.passwordConfirmation){
      throw new Error("Password does not match");
    }
    const newUser = await User.create(input);
    return "Signed up successfully"
  },
  signIn:async(root,{input},{res})=>{
    const emailIsExit = await User.findOne({email:input?.email});
    if(!emailIsExit){
      throw new Error("Email is not found")
    }
    const hashPassword = await bcrypt.compare(input?.password,emailIsExit?.password);
    if(!hashPassword){
      throw new Error("password is not correct");
    }
    const token = jwt.sign({userId:emailIsExit?._id},process.env.SECRET_TOKEN,{expiresIn:process.env.EXPIRES_AT});
    res.cookie("token",token,{
      httpOnly:true,
      maxAge:9 * 60 * 60 * 1000, // 9 hours
    })
    return token;
  },
  logout: async (root, args, { res }) => {
    // Clear the authentication token from the cookies
    res.clearCookie("token");
    return "Logged out successfully";
  },
}


module.exports = {
  portfolioResolversMutation,
  portfolioResolversQuery,
  userResolversMutation
}