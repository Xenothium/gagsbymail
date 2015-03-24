var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/buy', function(req, res) {
    res.render('buy', {});
});
/*name,phone number,email,address line, city,state/province, country (dropdown), pin code
recepient name, phone number, email,  address line, city,state/province country (dropdown), pin code*/
router.post('/buy' function (req, res){
    var newOrder = {};
    var valid = function () {
        if (req.body.cnumber.length == 10) {

        }
        else {
            return false;
        }
        if (req.body.rnumber.length == 0 || req.body.rnumber.length == 10) {

        }
        else {
            return false;
        }
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(req.body.cemail)) {
            return false;
        }
        if (!isNaN(req.body.remail)) {
            if (!re.test(req.body.remail)) {
                return false;
            }
        }
    }
    if (valid) {
    newOrder.cName = req.body.cname;
    newOrder.cCCode = req.body.cccode;
    newOrder.cPhone = req.body.cnumber;
    newOrder.cEmail = req.body.cemail;
    newOrder.cAddress = req.body.caddress;
    newOrder.cState = req.body.cstate;
    newOrder.cPin = req.body.cpin;
    newOrder.cCountry = req.body.ccountry;
    newOrder.checkBox = req.body.check;
    if (checkBox) {
        newOrder.rName = newOrder.cName;
        newOrder.rCCode = newOrder.cCCode;
        newOrder.rPhone = newOrder.cPhone;
        newOrder.rEmail = newOrder.cEmail;
        newOrder.rAddress = newOrder.cAddress;
        newOrder.rState = newOrder.cState;
        newOrder.rPin = newOrder.cPin;
        newOrder.rCountry = newOrder.cCountry;
    }
    else {
        newOrder.rName = req.body.rname;
        newOrder.rCCode = req.body.rccode;
        newOrder.rPhone = req.body.rnumber;
        newOrder.rEmail = req.body.remail;
        newOrder.rAddress = req.body.raddress;
        newOrder.rState = req.body.rstate;
        newOrder.rPin = req.body.rpin;
        newOrder.rCountry = req.body.rcountry;
    }

    newOrder.date = new Date().toJSON();
    newOrder.quantity = req.body.quantity;
    newOrder.item = req.body.describe;

    }
    else {
        res.render('error',{});
    }
});

module.exports = router;
