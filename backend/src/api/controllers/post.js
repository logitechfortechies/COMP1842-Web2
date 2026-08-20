const Post = require('../models/post');

module.exports = {
  async getPosts(req, res) {
    const posts = await Post.find({}).sort({_id:-1});
    res.send({ posts: posts });
  },
  async addPost(req, res) {
    const new_post = new Post({
      title: req.body.title,
      description: req.body.description,
      language: req.body.language,
      image: req.body.image 
    });
    await new_post.save();
    res.send({ success: true });
  },
  async updatePost(req, res) {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.description = req.body.description;
    post.language = req.body.language;
    post.image = req.body.image;
    await post.save();
    res.send({ success: true });
  },
  async deletePost(req, res) {
    await Post.deleteOne({ _id: req.params.id });
    res.send({ success: true });
  }
};