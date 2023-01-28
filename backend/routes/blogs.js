const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Blog = require('../models/Blog');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Blogs using: GET "/api/blogs/getuser". Login required
router.get('/fetchallblogs', fetchuser, async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipIndex = (page - 1) * limit;

        const blogs = await Blog.find({}).limit(limit).skip(skipIndex);
        res.json(blogs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Add a new Blog using: POST "/api/blogs/addblog". Login required
router.post('/addblog', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const blog = new Blog({
                title, description, tag, user: req.user.id
            })
            const savedBlog = await blog.save()

            res.json(savedBlog)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing blog using: PUT "/api/blogs/updateblog". Login required
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newBlog object
        const newBlog = {};
        if (title) { newBlog.title = title };
        if (description) { newBlog.description = description };
        if (tag) { newBlog.tag = tag };

        // Find the blog to be updated and update it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true })
        res.json({ blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Blog using: DELETE "/api/blogs/deleteblog". Login required
router.delete('/deleteblog/:id', fetchuser, async (req, res) => {
    try {
        // Find the blog to be delete and delete it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Blog
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        blog = await Blog.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Blog has been deleted", blog: blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router