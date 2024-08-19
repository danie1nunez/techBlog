const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const PostData = require('./postData.json');
const CommentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = [];
  for (const Posts of PostData) {
    const newPost= await Post.create({
      ...Posts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    posts.push(newPost);
  }

  for(const Comments of CommentData){
    await Comment.create({
      ...Comments,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();
