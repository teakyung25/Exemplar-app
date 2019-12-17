const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

//Connection to Database Server
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:s_dev_2019@localhost:5432/postgres')
// const db = pgp('postgres://postgres:master_dev_2019@exemplar-db.cfby3ogrbxbu.us-east-2.rds.amazonaws.com:5432/postgres')


//Public files run
app.use(express.static('public'))
app.use(express.json({limit : '1mb'}))
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 8080;
//Passport.js Authentication
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes.js')(passport,db,bcrypt,app)

app.listen(PORT, () => console.log(`listening at ${PORT}`))