const router = require('express').Router()
const User = require('../models/users.model')
const College = require('../models/college.model')
const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false}) //middleware

router.route('/').get((req, res) => {
    User.findOne({username: req.query.username})
    .then(users => res.json(users))
    .catch(err =>res.statusMessage(400).json('Error: ' + err))
})


router.route('/').post((req, res) => {

    User.updateOne(
        { _id: req.body.params._id }, 
        { $addToSet: {collegeGroups: [req.body.body.college]} },
       function (error, success) {
             if (error) {
                 res.send(error);
             } else {
                 res.send(success);
             }
         }); 
})

module.exports = router