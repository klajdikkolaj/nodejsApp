const http = require('http');
const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
const bodyParser = require('body-parser')
const shopRoutes = require('./routes/shop')
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req,res,next) =>{
    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
});

app.listen(3000);
