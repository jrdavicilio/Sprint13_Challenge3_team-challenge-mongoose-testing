const express = require('express')
const router = express.Router()
const Post = require ('../models/Post')

router.post ('/create', async (req,res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).send(post)
    } catch (error) {
        console.error (error)
        res.status(500).send ({message: 'There was a problem trying to create the post'})
    }
})

router.get ('/', async (req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).send(posts)
    } catch (error) {
        console.error (error)
        res.status(500).send ({message: 'There was a problem trying to get all the posts'})
    }
})

router.get ('/id/:id', async (req,res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        res.status(200).send(post)
    } catch (error) {
        console.error (error)
        res.status(500).send ({message: 'There was a problem trying to get the post'})
    }
})

router.get ('/title/:title', async (req,res) => {
    try {
        const title = req.params.title
        const post = await Post.findOne({title})
        res.status(200).send(post)
    } catch (error) {
        console.error (error)
        res.status(500).send ({message: 'There was a problem trying to get the post'})
    }
})

router.put ('/id/:id', async (req,res) => {
    try {
        const id = req.params.id
        const {title, body} = req.body
        const updatedPost = await Post.findByIdAndUpdate(id, {title, body}, {new: true})

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' })
        }

        res.status(200).send(updatedPost)
    } catch (error) {
        console.error (error)
        res.status(500).send ({message: 'There was a problem trying to update the post'})
    }
})

router.delete ('/id/:id', async (req,res) => {
    try {
        const id = req.params.id
        const deletedPost = await Post.findByIdAndDelete(id)

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' })
        }

        res.status(200).send(deletedPost)
    } catch (error) {
        console.error (error)
        res.status(500).send ({message: 'There was a problem trying to delete the post'})
    }
})

router.get ('/postsWithPagination', async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const skip = (page - 1) * limit

        const posts = await Post.find().skip(skip).limit(limit).sort({createdAt: -1})

        res.status(200).send(posts)
    } catch (error) {
        console.error (error)
        res.status(500).send ({message: 'There was a problem trying to get the posts'})
    }
})

module.exports = router