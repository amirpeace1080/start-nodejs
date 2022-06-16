const express = require("express");
const router = express.Router();

let customers = [
  {id: 1, name: "ali"},
  {id: 2, name: "saeed"},
  {id: 3, name: "mohammad"},
  {id: 4, name: "yalda"},
];

router.get("/api/customers", (req, res) => {
  res.send(customers);
});

router.get("/api/customers/:id", (req, res) => {
  const customer = customers.find(item => item.id == req.params.id);
  if (customer)
    res.send(customer);
  else res.status(404).send("not found");
});

router.post("/api/customers", function (req, res) {

  // input validation
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required()
  })
  const {error} = schema.validate(req.body);
  if (error)
    return res.status(400).send({message: error.message});
  //
  // if (!req.body.name || req.body.name.length < 2)
  //   return res.status(400).send({success: false, message: "مقادیر ورودی را چک کنید"});

  const customer = {
    id: customers[customers.length - 1].id + 1,
    name: req.body.name,
  };

  customers.push(customer);
  res.send(customer);
});

router.put("/api/customers/:customerId", (req, res) => {
  // input validation
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    customerId: Joi.number().required()
  });
  const {error} = schema.validate({...req.body, customerId: req.params.customerId});
  if (error)
    return res.status(400).send({message: error.message});

  const index = customers.findIndex(item => item.id == req.params.customerId);
  if (index === -1)
    return res.status(404).send({message: "مشتری مورد نظر یافت نشد"})
  customers[index].name = req.body.name;
  res.send(customers[index]);
});

router.delete("/api/customers/:customerId", (req, res) => {
  const index = customers.findIndex(item => item.id == req.params.customerId);
  if (index === -1)
    return res.status(404).send({message: "مشتری مورد نظر یافت نشد"})
  customers = [...customers.slice(0, index), ...customers.slice(index + 1)];
  res.status(200).send();
});


module.exports = router;
/*
* [1,2,3,4,5]
* */