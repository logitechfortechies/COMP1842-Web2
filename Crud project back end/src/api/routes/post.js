const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/post');

router.get('/', PostsController.getPosts);      
router.post('/', PostsController.addPost);       
router.put('/:id', PostsController.updatePost);  
router.delete('/:id', PostsController.deletePost);

module.exports = router;