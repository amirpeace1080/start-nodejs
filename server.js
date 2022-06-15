const express = require('express')
const app = express();
const joi = require('joi');

app.use(express.json())

const customers = [
    {id: 1, name: 'mohammad'},
    {id: 2, name: 'amir'},
    {id: 3, name: 'peace'},
    {id: 4, name: '1080'}
]

app.get('/', function (req, res) {
    res.send('Hello World')
  })

app.get('/api/customers', function (req, res) {
res.send(customers)
})

app.get('/api/customers/:id',(req, res) =>{
   const customer = customers.find(item => item.id == req.params.id);
   if(customer)
   res.send(customer)
   else res.send("not found")
})

app.post('/api/customers', (req, res)=>{
    const schema = joi.object({
        name: joi.string().min(2).max(10).required()
    })

    const{error} = schema.validate(req.body)
    if(error)
    return res.status(400).send({ message: error.message})

    // if(!req.body.name || req.body.name.length < 2)
    //  return res.status(400).send({success: false, message: 'مقادیر ورودی را چک کنید'})

    const customer = {
        id: customers[customers.length -1].id + 1,
        name: req.body.name
    }
    customers.push(customer);
    res.send(customer)
})


const port = process.env.myPort || 3000;
app.listen(port, (err) =>{
    if(err) console.log(err);
    else console.log(`app listen to port ${port}`);
})