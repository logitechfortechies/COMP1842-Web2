const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/post');

router.get('/', PostsController.getPosts);       // READ
router.post('/', PostsController.addPost);       // CREATE
router.put('/:id', PostsController.updatePost);  // UPDATE
router.delete('/:id', PostsController.deletePost); // DELETE

module.exports = router;