var express = require('express');
var mongo = require('mongodb');
var router = express.Router();

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/gagsbyemail';

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/buy', function(req, res) {
    res.render('buy', {});
});
/*name,phone number,email,address line, city,state/province, country (dropdown), pin code
recepient name, phone number, email,  address line, city,state/province country (dropdown), pin code*/
router.post('/buy', function (req, res){
    var quantity = req.body.dropdown;
    var newOrder = [];
    for (var i = 0;i < quantity; i++) {
        newOrder[i] = {};
    }
    if (checkBox) {
        req.body.rname2 = req.body.rname1;
        req.body.rnumber2 = req.body.rnumber1;
        req.body.remail2 = req.body.remail1;
        req.body.raddress2 = req.body.raddress1;
        req.body.rcity2 = req.body.rcity1;
        req.body.rstate2 = req.body.rstate1;
        req.body.rcountry2 = req.body.rcountry1;
        req.body.rname3 = req.body.rname1;
        req.body.rnumber3 = req.body.rnumber1;
        req.body.remail3 = req.body.remail1;
        req.body.raddress3 = req.body.raddress1;
        req.body.rcity3 = req.body.rcity1;
        req.body.rstate3 = req.body.rstate1;
        req.body.rcountry3 = req.body.rcountry1;
    }
    var valid = function () {
        if (req.body.rnumber.length != 10 || req.body.rnumber2.length != 10 || req.body.rnumber3.length != 10) {
            return false;
        }
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(req.body.remail1) || !re.test(req.body.remail2) || !re.test(req.body.remail3)) {
            return false;
        }
    }
    if (valid) {
        for (i = 0; i < quantity; i++) {
            newOrder[i].quantity = quantity;
            newOrder[i].date = new Date().toJSON();
            if (i == 0){
                newOrder[i].rName = req.body.rname1;
                newOrder[i].rNumber = req.body.rnumber1;
                newOrder[i].rEmail = req.body.remail1;
                newOrder[i].rAddress = req.body.raddress1;
                newOrder[i].rCity = req.body.rcity1;
                newOrder[i].rState = req.body.rstate1;
                newOrder[i].rCountry = req.body.rcountry1;
            }
            else if (i == 1){
                newOrder[i].rName = req.body.rname2;
                newOrder[i].rNumber = req.body.rnumber2;
                newOrder[i].rEmail = req.body.remail2;
                newOrder[i].rAddress = req.body.raddress2;
                newOrder[i].rCity = req.body.rcity2;
                newOrder[i].rState = req.body.rstate2;
                newOrder[i].rCountry = req.body.rcountry2;
            }
            else {
                newOrder[i].rName = req.body.rname3;
                newOrder[i].rNumber = req.body.rnumber3;
                newOrder[i].rEmail = req.body.remail3;
                newOrder[i].rAddress = req.body.raddress3;
                newOrder[i].rCity = req.body.rcity3;
                newOrder[i].rState = req.body.rstate3;
                newOrder[i].rCountry = req.body.rcountry3;
            }
        }
        exports.orders = newOrder; //trying to export the newOrder object so as to insert only after success is received
    }
    else {
        res.render('buy',{response:"Error filling details"});
    }
});

router.get('/success', function (req, res) {
    var onConnect = function (err, db) {
        var collection = db.collection(transactions);
        var onInsert = function (err, orders) {
            if (err) {
                console.log('Error');
            }
            else {
                console.log('Transaction Stored');
            }
        }
        for (var i = 0; i < objects[i].quantity; i++) {
            collection.insert(orders[i], onInsert);
        }
        mongo.connect(mongoURI, onConnect);
    }
});

module.exports = router;
