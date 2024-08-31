const {Schema,model,models} = require("mongoose");

const PortfolioSchema = new Schema({
  title:{
    type:String,
    required:[true,"title is required"]
  },
  company:{
    type:String,
    required:[true,"company is required"]
  },
  company:{
    type:String,
    required:[true,"companyName is required"]
  },
  description:{
    type:String,
    required:[true,"description is required"]
  },
  location:{
    type:String,
    required:[true,"location is required"]
  },
  location:{
    type:String,
    required:[true,"location is required"]
  },
  jobTitle:{
    type:String,
    required:[true,"jobTitle is required"]
  },
  startDate:{
    type:Date,
    default:Date.now
  },
  endDate:{
    type:Date,
    default:Date.now
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
},{timestamps:true})


const Portfolio = models?.Portfolio || model("Portfolio",PortfolioSchema);

module.exports = Portfolio;