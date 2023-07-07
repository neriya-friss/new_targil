const fs = require('fs')
var express = require('express');
var router = express.Router();
var XLSX = require('node-xlsx')
var moment = require('moment');
const path=require('path');
const { spawn } = require('child_process');

const path_of_file = path.join(__dirname,'../bash.bat');
console.log("path", path_of_file);

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
    const courtsFolder = './courts';
    let courtsArr = [];
    fs.readdirSync(courtsFolder).forEach(file => {
        console.log(file);
        courtsArr.push({courtName:file});
    });
    res.render('welcom',{courtName: courtsArr});
});

router.post('/add-targil', function(req, res, next){
    console.log("get add-targil", req.body);
    let hebrow_name = req.body.hebrow_name;
    let eng_name = req.body.eng_name;
    let db_name = req.body.db_name;
    let copy_targil = req.body.copy_targil;
    let computer_targil = req.body.computer_targil
    let cv_radio = req.body.cv_radio;
    let raam_radio = req.body.raam_radio;
    let lunch_radio = req.body.lunch_radio;
    let hozi_radio = req.body.hozi_radio;
    let mas_radio = req.body.mas_radio;

    console.log(hebrow_name, eng_name, db_name, copy_targil, computer_targil,  cv_radio, raam_radio, lunch_radio, hozi_radio, mas_radio);
   
    const command = `${path_of_file} "${hebrow_name}" "${eng_name}" "${db_name}" "${copy_targil}" "${computer_targil}"  "${cv_radio}"  "${raam_radio}"  "${lunch_radio}"  "${hozi_radio}" "${mas_radio}" `;
    console.log("command", command);
    const batProcess = spawn(command, [], { shell: true });

    batProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    batProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      if (stderr && stderr.trim() !== "") {
        console.error(stderr);
        // Handle the error appropriately
        res.status(500).send("An error occurred while executing the batch file.");
      }
    });
    
    batProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    
    res.redirect("/success");
});

router.get('/success', function(req, res, next) {
    res.render('success');
});
module.exports = router;

