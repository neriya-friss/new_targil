const fs = require('fs')
var express = require('express');
var router = express.Router();
var XLSX = require('node-xlsx')
var moment = require('moment');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express', session : req.session });
});

router.post('/login', function(req, res, next){
    let user_name = req.body.user_name;
    let user_password = req.body.user_password;
    if(user_name && user_password)
    {
        if(user_name === 'mamraz' && user_password === 'aqm123')
        {
            res.redirect('welcom');
        }
        else
        {
            res.send('<h1 style="text-align:center"> שם המשתמש או הסיסמה אינם נכונים </h1>');
        }
    }
    else
    {
        res.send('<h1 style="text-align:center"> נא הכנס שם משתמש וסיסמה </h1>');
        res.end();
    }
});

router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect("/");
});

router.get('/welcom', function(req, res, next) {
    res.render('welcom',{  session : req.session });
});


module.exports = router;

