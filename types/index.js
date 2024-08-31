exports.portfolioTypes = `
  type Portfolio{
    _id:ID
    title:String
    company:String
    companyWebsite:String
    location:String
    jobTitle:String
    description:String
    startDate:String
    endDate:String
  }
  input PortfolioInput{
    title:String
    company:String
    companyWebsite:String
    location:String
    jobTitle:String
    description:String
    startDate:String
    endDate:String
  }
`;


exports.userType = `
  input signUpInput{
    username:String!
    name:String!
    email:String!
    password:String!
    passwordConfirmation:String!
    avatar:String!
  }
  
  input signInInput{
    email:String!
    password:String!
  }

  type userData{
  _id: ID!
    username:String
    name:String
    email:String
    avatar:String
    role:String
  }
`;

exports.categoryTypes = `
  type CategoryData{
    _id:ID
    title:String
    subTitle:String
    slug:String
  }
`


exports.topicTypes = `
  type TopicData{
    _id:ID
    title:String
    content:String
    slug:String
    forumCategory:String
    user:String
  }
`
