const forumCategories = [
  {
  
    title: 'How to learn JS',
    slug: "how-to-learn-js",
    content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    forumCategory: "66d2d214bafd186d29ada6bd",
    user: "66c99264abbc2ab363b99608"
  },
  {
    title: 'How to learn JAVA',
    
    content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    forumCategory: "66d2d214bafd186d29ada6bc",
    user: "66c99a3d6120d10a983e90b8"
  },
  {
    title: 'How to learn C++',
    content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    forumCategory: "66d2d214bafd186d29ada6bb",
    user: "66caa4f698b2262f4d46d50c"
  }
  
];
const Topics = require("../models/topics");


class FakeDB{

  async clean(){
    await Topics.deleteMany({})
  }
  async addData(){
    await Topics.create(forumCategories)
  }

  async populate(){
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDB();