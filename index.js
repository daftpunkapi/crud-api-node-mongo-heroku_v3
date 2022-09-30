const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 3000

// connect to mongoose
mongoose.connect(process.env.MONGO_URL, 
{useNewURLParser: true}).then(() => {
    console.log("Connected to mongoooooooose");
}).catch(error => {
    console.log("Something wrong happened");
});


// start server
app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
});