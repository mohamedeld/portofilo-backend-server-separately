const express = require("express");
const {ApolloServer,gql} = require("apollo-server-express")
const cors = require("cors");
const  {portfolioResolversQuery,portfolioResolversMutation, userResolversMutation}  = require("./resolvers");
const  {portfolioTypes,userType}  = require("./types");
const dotenv = require("dotenv");
const session = require("express-session");
const {connectDb,store} = require("./database");

dotenv.config();

const sess = {
  name:'portfolio-session',
  secret:process.env.SECRET_TOKEN,
  cookie:{maxAge:2*60*60*1000},
  resave:false,
  saveUninitialized:false,
  store
}

const app = express();

app.use(cors());



const typeDefs = gql`
  ${portfolioTypes}
  ${userType}
  type Query{
    hello:String
    portfolio(id:ID):Portfolio
    portfolios:[Portfolio]
  }
  type Mutation{
    createPortfolio(input:PortfolioInput):Portfolio
    updatePortfolio(id:ID,input:PortfolioInput):Portfolio
    deletePortfolio(id:ID):String
    signUp(input:signUpInput):String
    signIn(input:signInInput):String
  }
`;
const resolvers ={
  Query:{
    ...portfolioResolversQuery,
  },
  Mutation:{
    ...portfolioResolversMutation,
    ...userResolversMutation
  }
  
}


async function startServer() {
  try {
    // Connect to the database first
    await connectDb();

    app.use(session(sess))
    // Then initialize and start the Apollo Server
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    apolloServer.applyMiddleware({ app });

    // Start listening on the specified port
    const port = 4000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
}
startServer();