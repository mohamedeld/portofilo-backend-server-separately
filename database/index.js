const mongoose =require("mongoose");
const fakeDB = require("../fakDb/FakeDB");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);

const connectDb = ()=>{
  try{
    mongoose.connect(process.env.DB_URL).then(async(result)=>{
      console.log("connected to db")
      // await fakeDB.populate();
    }).catch(err=>console.log(err));
  }catch(error){
    console.log(error)
  }
}

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'portfolioSessions'
});
module.exports = {
  connectDb,
  store
};
