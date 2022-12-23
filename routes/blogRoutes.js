
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const blogController = require('../controllers/blogController')


router.get('/', blogController.blog_index)

router.get('/blogsall', blogController.blog_indexall)

router.post('/', blogController.blog_create_post)


router.get('/:id', blogController.blog_details);

router.get('/update/:id',blogController.blog_update)

router.put('/:id',blogController.blog_update_post)

router.delete('/:id', blogController.blog_delete);

module.exports = router
