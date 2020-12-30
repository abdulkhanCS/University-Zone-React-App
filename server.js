const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose')
const Post = require('./models/forumPost.model')

require('dotenv').config()

const app = express()
const port = process.env.PORT || '5000';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
     console.log('connected to database');
  })
  .catch(error => {
     //MongooseServerSelectionError MongooseError [MongooseServerSelectionError]: Authentication failed
     console.log("Error", error)
  });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})
connection.on('error', (error) => {
    console.warn('!Warning:', error);
})

const userRouter = require('./routes/user')
app.use('/user', userRouter)
const homepageRouter = require('./routes/home')
app.use('/homepage', homepageRouter)
const forumRouter = require('./routes/forum')
app.use('/forum', forumRouter)

// app.get('/forum/:college', function(req, res){
//   console.log("URL IS NOW ", req.url)
//   console.log(req.params)
// })

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.js'));
  });
}
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});