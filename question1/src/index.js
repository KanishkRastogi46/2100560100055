// configuring .env file for environment variables
require("dotenv").config({path: './.env'});

const express = require("express");

// initialising express app
const app = express();

// specifying on which port the app will run
const port = process.env.PORT || 3000;

// built-in middlewares for handling json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Api endpoint for extracting top rated products
const categoryRouter = require("./routes/category-route")
app.use('/company', categoryRouter);


app.listen(port, ()=>{
    console.log(`Listening on port ${port}....`)
})