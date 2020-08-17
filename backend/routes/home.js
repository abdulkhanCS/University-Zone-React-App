const router = require('express').Router()
const User = require('../models/users.model')
const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false}) //middleware

router.route('/').get((req, res) => {
    User.findOne({username: req.query.username})
    .then(users => console.log("data is ", res.json(users)))
    .catch(err =>res.statusMessage(400).json('Error: ' + err))
})


router.route('/').post((req, res) => {
    User.update(
        {"_id": req.params._id},
        { "$push": { collegeGroups: req.body.chosenCollege} },
    )
    .then((res) => {
        console.log("result is ", res)
    })
    .catch((err) => {
        console.log("error is ", err)
    })
})

module.exports = router