const mongoose = require('mongoose');
// const express = require('express');

// DIRECTORY SCHEMA
const dir_schema = new mongoose.Schema({
    Company:{
        type:String,
        required: true,
        maxlength: 25
    },
    Company_URL:{
        type:String,
        required: true,
        maxlength: 50
    },
    Category:{
        type:String,
        maxlength: 25
    },
    Sub_Category:{
        type:String,
        maxlength: 50
    },
    API_Industry_Cater:{
        type:String,
        maxlength: 50
    },
    YYYY_Found:{
        type:Number,
        maxlength: 4,
        minlength: 4
    },
    Equity:{
        type:Number
    },
    Investor:{
        type:String,
        maxlength: 50
    },
    Stage:{
        type:String,
        maxlength: 50
    },
    Country:{
        type:String,
        maxlength: 50
    }
});

module.exports = new mongoose.model("directories", dir_schema)