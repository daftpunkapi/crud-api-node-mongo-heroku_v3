const express = require('express');
const router = express.Router();
const Company = require('../models/directory');

// POST : Create new company entry
router.post("/",(req,res) => { 
    company = new Company({
        Company: req.body.Company,
        Company_URL: req.body.Company_URL,
        Category: req.body.Category,
        Sub_Category: req.body.Sub_Category,
        API_Industry_Cater: req.body.API_Industry_Cater,
        YYYY_Found: req.body.YYYY_Found,
        Equity: req.body.Equity,
        Investor: req.body.Investor,
        Stage: req.body.Stage,
        Country: req.body.Country
    });

    company.save().then(comapny  => {
        res.send(comapny);
    }).catch(error => {
        res.status(500).send("Company was not stored in DB");
    });
});

module.exports = router;