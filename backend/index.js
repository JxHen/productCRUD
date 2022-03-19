const port = 4000
const express = require('express')
const bodyParser = require('body-parser');
var mysql = require('mysql');
const app = express()
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqlpass123",
    database: "productDB"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//conecting to DB
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//Enable CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//route for posting new products
app.post('/new', (req, res) => {
    const product = (req.body);
    const query = "Insert into Product (name, quantity, price) VALUES ('" + product.name + "', " + product.quantity + ", " + product.price + ");"
    con.query(query, function (err, result) {
        if (err) throw err;
    });
    res.setHeader('content-type', 'application/json');
    res.send('Got a POST request')
})
//route for updating one product
app.post('/update', (req, res) => {
    const product = (req.body);
    const query = "Update Product set name= '" + product.name + "', quantity= " + product.quantity + ", price= " + product.price + " where idproduct= " + product.id + ";"
    con.query(query, function (err, result) {
        if (err) throw err;
    });
    res.setHeader('content-type', 'application/json');
    res.send('Got a POST request')
})
//route for deleting one product
app.post('/delete', (req, res) => {
    const product = (req.body);
    const query = "DELETE FROM Product WHERE idproduct= " + product.id + ";"
    con.query(query, function (err, result) {
        if (err) throw err;
    });
    res.setHeader('content-type', 'application/json');
    res.send('Got a POST request')
})
//route for retrieving all products
app.get('/all', (req, res) => {
    con.query("select * from Product", function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result))
    });
})
//route for retrieving one product
app.get('/product', (req, res) => {
    const { id } = (req.query)
    let query = "select * from Product where idproduct = " + id;
    con.query(query, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result[0]))
    });
})
//route for retrieving multiple products based on a page size
app.get('/products', (req, res) => {
    const { page } = (req.query)
    const query = "select * from Product limit 10 offset " + page;
    con.query(query, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result))
    });
})
//route for retrieving multiple products based on a page size
app.get('/pageAmount', (req, res) => {
    const query = "select count(*) as productAmount from Product";
    con.query(query, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result))
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})