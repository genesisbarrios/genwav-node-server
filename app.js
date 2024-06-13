const express = require('express')
const bodyParser = require('body-parser');
const dbConnect = require('./connectdb.js'); // Import your dbConnect function
const userSchema = require('./user');
const cors = require('cors');

const app = express();

// Use cors middleware and allow all origins
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Create a model based on the schema (same as before)
const User = userSchema;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })

//POST
app.post('/addUser', async (req, res) => {
    const { email, producer, artist, fan } = req.body;
    console.log(req.body)
    console.log('add user')
    try {
        // Connect to the database using dbConnect function
        const conn = await dbConnect();

        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ message: 'You already signed up!' });
        } else {
            // Create a new item
            const newUser = new User({
                //name: name,
                email: email,
                producer: producer,
                artist: artist,
                fan:fan
            });

            // Save the item to the database
            const savedItem = await newUser.save();
            console.log('saved user!');
            res.status(200).json({ message: 'User added successfully' });
        } 
        }catch (error) {
            console.log('failed');
            console.log(error)
            res.status(400).json({ error: error.message });
        } 
});



module.exports = app