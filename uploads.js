var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

// file schema associated to each user file

var fileSchema = mongoose.Schema({
  view :Boolean,
  username: String,
  type : String,
  filename : String,
  created: Date,
  verify: Boolean,
  verified : Boolean,
  reject : Boolean,
  vtime : Date,
  file: Object
}, {collection: "files"});

var Upload = module.exports = mongoose.model('Upload', fileSchema);

// module to send mail

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  
   auth: {
       user: "", // enter your from email address here
       pass: ""  // enter your password here
   }
});

// gets the list of all files from the database

router.get('/', function (req, res, next) {
  Upload.find({},  function (err, uploads) {
    if (err) 
      next(err);
    else {
      res.send(uploads);
    }
  });
});

// fetch all document details where view is enabled

router.get('/docview/:user', function (req, res, next) {
  console.log('here');
  Upload.find({'username':req.params.user,'view':true},  function (err, uploads) {
    if (err) 
      next(err);
    else {
      res.send(uploads);
    }
  });
});

// fetch verified documents

router.get('/loaddoc/:user', function (req, res, next) {
  var user = req.params.user;
  Upload.find({'username':user, 'verified':true},  function (err, uploads) {
    if (err) 
      next(err);
    else {
      res.send(uploads);
    }
  });
});

// fetch documents to be verified

router.get('/verifylist/:user', function (req, res, next) {
  Upload.find({'type':req.params.user,'verify':true,'verified':false, 'reject':false},  function (err, uploads) {
    if (err) 
      next(err);
    else {
      res.send(uploads);
    }
  });
});

// fetch history of all verified docs

router.get('/verifyhistory/:user', function (req, res, next) {

  Upload.find({'type':req.params.user, $or:[ {'verified':true}, {'reject':true} ]},  function (err, uploads) {
    if (err) 
      next(err);
    else {
      res.send(uploads);
    }
  });
});

// verify response from user

router.put('/response/:id', function (req, res, next) {
  var time = Date.now()
  Upload.findOneAndUpdate({_id : req.params.id},{verified : true, vtime : time},function(err,data){
    res.json(data);
  });

});

// reject response from user

router.put('/rejresponse/:id', function (req, res, next) {
  var time = Date.now()
  Upload.findOneAndUpdate({_id : req.params.id},{reject : true, vtime : time},function(err,data){
    res.json(data);
  });

});

// mail sending to user and verify request

router.put('/:id', function (req, res, next) {

  Upload.findOneAndUpdate({_id : req.params.id},{verify : true},function(err,data){
    res.json(data);
  });

  smtpTransport.sendMail({ 
    from: "< >", // source email address
    to: "< >", // destination email address
    subject: "DocuCheck - Verify Request", // email subject
    text: "You have a document pending to be verified in your shelf. Please login to verify" // email content
  },function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
    }
    smtpTransport.close();
  });
});

// delete the document or setting view to false

router.put('/deldoc/:id', function (req, res, next) {
  Upload.findOneAndUpdate({_id : req.params.id},{view : false},function(err,data){
    res.json(data);
  });
});

// download file

router.get('/:uuid/:filename', function (req, res, next) {
  Upload.findOne({
    'file.filename': req.params.uuid,
    'file.originalname': req.params.filename
  }, function (err, upload) {
    if (err) 
      next(err);
    else {
      res.set({
        "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
        "Content-Type": upload.file.mimetype
      });
      fs.createReadStream(upload.file.path).pipe(res);
    }
  });
});

// Create's the file in the database
 
router.post('/upload/:user', upload.single('file'), function (req, res, next) {
  var newUpload = {
    view : true,
    username: req.params.user,
    type : req.body.type,
    filename : req.body.filename,
    created: Date.now(),
    verify: false,
    verified: false,
    reject : false,
    file: req.file
  };
  Upload.create(newUpload, function (err, next) {
    if (err) {
      next(err);
    } else {
      res.send(newUpload);
    }
  });
});

module.exports = router;