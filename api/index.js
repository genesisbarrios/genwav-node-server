const mongoose = require('mongoose');
const userSchema = require('../user'); // Adjust the path as necessary
const dbConnect = require('../connectdb'); // Adjust the path as necessary
const cors = require('cors');
const express = require('express');
const serverless = require('serverless-http');

const app = express(); // Correctly initialize the Express app
const router = express.Router();

// Use cors middleware and allow all origins
app.use(express.json());
app.use(cors());

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳');
});

app.post('/addUser', async (req, res) => {
    const { email, producer, artist, fan } = req.body;
    console.log(req.body);
    console.log('add user');
    try {
        // Connect to the database using dbConnect function
        await dbConnect();

        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ message: 'You already signed up!' });
        } else {
            // Create a new item
            const newUser = new User({
                email: email,
                producer: producer,
                artist: artist,
                fan: fan
            });

            // Save the item to the database
            const savedItem = await newUser.save();
            console.log('saved user!');
            res.status(200).json({ message: 'User added successfully' });
        }
    } catch (error) {
        console.log('failed');
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});


const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
//   const handler = (req, res) => {
//     const d = new Date()
//     res.end(d.toString())
//   }
  
// Mount the router on the app
app.use('/api', router);
  
// module.exports = app;
const handler = serverless(app);
module.exports.handler = allowCors(handler)