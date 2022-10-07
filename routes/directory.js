const express = require('express');
const router = express.Router();
const Company = require('../models/directory');
const { isAdmin } = require("../middlewares/authorize");


// GET : All companies
router.get("/all", (req,res) => {
    Company.find()
    .then(companies => {res.send(companies)})
    .catch(error => {
        res.status(500).send("Company data could not be retrieved");
    });
});

// //GET : Random Company
router.get("/random", async (req, res) => {
  // get_id = 
  // const query = {_id : get_id};
  await Company.aggregate(
    [{ $sample : {size : 1} }] )
  .then(companies => {res.send(companies)})
  .catch(error => {
      res.status(500).send("Company data could not be retrieved");
  });
});

//GET : By name
router.get("/:name", async (req, res) => {
  var query = {Company : req.params.name};
  await Company.find(query)
  .then(companies => {res.send(companies)})
  .catch(error => {
      res.status(500).send("Company data could not be retrieved");
  });
});

//GET : By year
router.get("/year/:year", async (req, res) => {
  var query = {YYYY_Found : req.params.year};
  await Company.find(query)
  .then(companies => {res.send(companies)})
  .catch(error => {
      res.status(500).send("Company data could not be retrieved");
  });
});


//DELETE : By Comapny Name
router.delete("/delete/:company", async (req, res) => {
  const comp = await Company.deleteOne({Company : req.params.company})
  if (!comp) res.status(404).send("Company with id not found");
  res.send("Company deleted");
});

//DELETE : By ID
router.delete("delete_id/:id", async (req, res) => {
  const comp = await Company.findByIdAndRemove(req.params.id);
  if (!comp) res.status(404).send("Company with id not found");
  res.send("Company deleted");
});

//UPDATE : By ID
router.put("/update_id/:id", async (req, res) => {
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
  
  //UPDATE : By Name
router.put("/update/:name", async (req, res) => {
  const updatedCompany = await Company.updateOne(
    {Company : req.params.name},
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

  // POST : Create new company
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



module.exports = router;