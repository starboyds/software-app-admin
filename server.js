const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// ************************** Models *******************************
const Product = require('./models/product');

// ************************** Controllers **************************

// ***************** Database Connection Setup ***************************
mongoose.connect("mongodb://localhost:27017/softwareDb", {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// ************************ Routes ************************** 
app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('home', {products});
})

app.get('/products', async(req, res) => {
    const products = await Product.find({});
    res.render('product/index', {products: products});
})

app.get('/product/new', (req, res) => {
    res.render('product/new')    
})

app.post('/product/create', async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect('/products');
})

app.get('/products/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product/singleProduct', {product: product});
})

// *********************** Listening to port ******************************
app.listen(4000, () => {
    console.log('server is running on PORT 4000')
})