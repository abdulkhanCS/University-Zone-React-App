const router = require('express').Router()
const User = require('../models/users.model')
const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false}) //middleware

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err =>res.statusMessage(400).json('Error: ' + err))
})

router.route('/register').post((req, res) => {
    console.log(req.body)
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const admin = req.body.admin
    const newUser = new User({firstName, lastName, username, password, email, admin})

    newUser.save()
    .then(() => res.json('User registered!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    // User.findById(req.params.id)
    // .then(user => res.json(user))
    // .catch(err => res.status(400).json('Error ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    // User.findByIdAndDelete(req.params.id)
    // .then(() => res.json('User Deleted'))
    // .catch(err => res.status(400).json('Error ' + err))
})

router.route('/update/:id').post((req, res) => {
    // User.findById(req.params.id)
    // .then(user => {
    //     user.username = req.body.username
    //     user.password = req.body.password
    //     user.email = req.body.email

    //     user.save()
    //         .then(() => res.json('User updated'))
    //         .catch(err => res.status(400).json('Error ' + err))
    // })
    // .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router