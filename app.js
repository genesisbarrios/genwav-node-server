import express from 'express';
import bodyParser from 'body-parser';
import dbConnect from './dbConnect'; // Import your dbConnect function
import userSchema from './user';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Create a model based on the schema (same as before)
const User = mongoose.model('user', userSchema);

//POST
app.post('/addUser', async (req, res) => {
    const { email, producer, artist } = req.body;

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
                    artist: artist
                });

                // Save the item to the database
                const savedItem = await newItem.save();
                
                res.json(savedItem);
            } 
        }catch (error) {
            res.status(400).json({ error: error.message });
        }

       
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
