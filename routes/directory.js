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

    company.save().then(company  => {
        res.send(company);
    }).catch(error => {
        res.status(500).send("Company was not stored in DB");
    });
});



// GET : Read all companies
router.get("/", (req,res) => {
    Company.find()
    .then(companies => {res.send(companies)})
    .catch(error => {
        res.status(500).send("Company data could not be retrieved");
    });

});


// //GET THE COMPANY BY ID
router.get("/:id", async (req, res) => {
    const comp = await Company.findById(req.params.id);
    if (!comp) res.status(404).send("Company not found");
    res.send(comp);
  });

//UPDATE COMPANY BASED ON ID
router.put("/:id", async (req, res) => {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { Company: req.body.Company,
        Company_URL: req.body.Company_URL,
        Category: req.body.Category,
        Sub_Category: req.body.Sub_Category,
        API_Industry_Cater: req.body.API_Industry_Cater,
        YYYY_Found: req.body.YYYY_Found,
        Equity: req.body.Equity,
        Investor: req.body.Investor,
        Stage: req.body.Stage,
        Country: req.body.Country},
      { new: true }
    );
  
    if (!updatedCompany) res.status(404).send("company not found");
    res.send(updatedCompany);
  });
  
//   //DELETE BOOK BASED ON ID
  router.delete("/:id", async (req, res) => {
    const comp = await Company.findByIdAndRemove(req.params.id);
    if (!comp) res.status(404).send("Company with id not found");
    res.send("Company deleted");
  });

module.exports = router;