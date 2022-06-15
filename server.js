const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());

let customers = [
  {id: 1, name: "ali"},
  {id: 2, name: "saeed"},
  {id: 3, name: "mohammad"},
  {id: 4, name: "yalda"},
];

app.get("/", (req, res) => {
  res.send("salam express");
});


app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find(item => item.id == req.params.id);
  if (customer)
    res.send(customer);
  else res.status(404).send("not found");
});

app.post("/api/customers", function (req, res) {

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

app.put("/api/customers/:customerId", (req, res) => {
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

app.delete("/api/customers/:customerId", (req, res) => {
  const index = customers.findIndex(item => item.id == req.params.customerId);
  if (index === -1)
    return res.status(404).send({message: "مشتری مورد نظر یافت نشد"})
  customers = [...customers.slice(0, index), ...customers.slice(index + 1)];
  res.status(200).send();
});



const port = process.env.myPort || 3000;
app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log(`app listen to port ${port}`);
})