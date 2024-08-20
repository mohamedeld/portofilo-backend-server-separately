const express = require("express");
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const cors = require("cors");
const  portfolioResolvers  = require("./resolvers");
const  portfolioTypes  = require("./types");
const app = express();

app.use(cors());



const schema = buildSchema(`
  ${portfolioTypes}
  type Query{
    hello:String
    portfolio(id:ID):Portfolio
    portfolios:[Portfolio]
  }
`);
const resolvers ={
  ...portfolioResolvers,
}

const port = 4000;
app.use('/graphql',graphqlHTTP({schema,rootValue:resolvers,graphiql:true}));

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})