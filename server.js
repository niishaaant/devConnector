const express = require('express');
const connectDB = require('./config/db');

//Initialise express
const app = express();

//Connect database
connectDB();

//Initialise middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/user', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`console started at ${PORT}`));
