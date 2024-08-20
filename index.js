const express = require("express");
const {ApolloServer,gql} = require("apollo-server-express")
const cors = require("cors");
const  {portfolioResolversQuery,portfolioResolversMutation}  = require("./resolvers");
const  portfolioTypes  = require("./types");
const app = express();

app.use(cors());



const typeDefs = gql`
  ${portfolioTypes}
  type Query{
    hello:String
    portfolio(id:ID):Portfolio
    portfolios:[Portfolio]
  }
  type Mutation{
    createPortfolio(input:PortfolioInput):Portfolio
  }
`;
const resolvers ={
  Query:{
    ...portfolioResolversQuery,
  },
  Mutation:{
    ...portfolioResolversMutation
  }
  
}
const apolloServer = new ApolloServer({typeDefs,resolvers});
apolloServer.applyMiddleware({app})
const port = 4000;

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})