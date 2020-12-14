const router = require('express').Router()
const Post = require('../models/forumPost.model')
const User = require('../models/users.model')
const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false}) //middleware

router.route('/').get((req, res) => {
    const college = req.body.college
    Post.find({college: college})
    .then(posts => res.json(posts))
    .catch(err =>res.statusMessage(400).json('Error: ' + err))
})


router.route('/').post((req, res) => {

    const college = req.body.college
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const postTitle = req.body.postTitle
    const postText = req.body.postText
    const email = req.body.email
    const newPost = new Post({college, firstName, lastName, username, postTitle, postText, email})

    newPost.save()
    .then(() => res.json('Post submitted!'))
    .catch(err => res.status(400).json('Error: ' + err))
   
})

module.exports = router