const express = require("express");
const {ApolloServer,gql} = require("apollo-server-express")
const cors = require("cors");
const  {portfolioResolversQuery,portfolioResolversMutation, userResolversMutation, userResolversQuery, categoryQuery, topicResolversQuery}  = require("./resolvers");
const  {portfolioTypes,userType, categoryTypes, topicTypes}  = require("./types");
const dotenv = require("dotenv");
const session = require("express-session");
const {connectDb,store} = require("./database");
const context = require("./middleware/isAuthenticated");
dotenv.config();
const cookieParser = require("cookie-parser");

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
app.use(cookieParser())


const typeDefs = gql`
  ${portfolioTypes}
  ${userType}
  ${categoryTypes}
  ${topicTypes}
  type Query{
    hello:String
    portfolio(id:ID):Portfolio
    portfolios:[Portfolio]
    getSingleUser(id:ID):userData
    getAllUsers:[userData]
    getAuthUser:userData
    allCategory:[CategoryData]
    singleCategory(id:ID):CategoryData
    allTopics:[TopicData]
    getTopic(id:ID):TopicData
    getTopicByCategory(forumCategory:ID):[TopicData]
  }
  type Mutation{
    createPortfolio(input:PortfolioInput):Portfolio
    updatePortfolio(id:ID,input:PortfolioInput):Portfolio
    deletePortfolio(id:ID):String
    signUp(input:signUpInput):String
    signIn(input:signInInput):userData
    logout:String
  }
`;
const resolvers ={
  Query:{
    ...portfolioResolversQuery,
    ...userResolversQuery,
    ...categoryQuery,
    ...topicResolversQuery
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
    const apolloServer = new ApolloServer({ typeDefs, resolvers,context });
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