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
  signUp:async(root,{input},{res})=>{
    if(input?.password !== input?.passwordConfirmation){
      throw new Error("Password does not match");
    }
    const newUser = await User.create(input);
    const token = jwt.sign({userId:newUser?._id},process.env.SECRET_TOKEN,{expiresIn:process.env.EXPIRES_AT});
    return token;
  },
  signIn:async(root,{input},context)=>{
    const emailIsExit = await User.findOne({email:input?.email});
    if(!emailIsExit){
      throw new Error("Email is not found")
    }
    const hashPassword = await bcrypt.compare(input?.password,emailIsExit?.password);
    if(!hashPassword){
      throw new Error("password is not correct");
    }
    
    const token = jwt.sign({userId:emailIsExit?._id},process.env.SECRET_TOKEN,{expiresIn:process.env.EXPIRES_AT});
    return token;
  },
  logout: async (root, args, { res }) => {
    // Clear the authentication token from the cookies
    res.clearCookie("token");
    return "Logged out successfully";
  },
 
}
const userResolversQuery = {
  getSingleUser:async(root,{id},{user,isAuthenticated})=>{
    
    if (!isAuthenticated) {
      throw new Error('Unauthorized access');
    }
    const fetchedUser = await User.findById(id).select("username name email avatar role");
    if(!fetchedUser) {
      throw new Error('User not found');
    }
    return fetchedUser;
  },
  getAuthUser:(root,args,{user,isAuthenticated})=>{
    if(isAuthenticated){
      return user;
    }
  },
  getAllUsers:async()=>{
    const users = await User.find({}).select("username name email avatar role");
    return users;
  }
}

module.exports = {
  portfolioResolversMutation,
  portfolioResolversQuery,
  userResolversMutation,
  userResolversQuery
}