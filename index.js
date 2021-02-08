const express = require('express');

const getDress = require('./getDress');
const Dress = require('./models/Dress');

const app = express();

const db = require("./helpers/dbConnection")();

app.use(express.static('public'));


app.get('/api/dress', async(req, res) => {
    const promise = Dress.find({});
    promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
})

const port = process.env.PORT || 4242;

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});