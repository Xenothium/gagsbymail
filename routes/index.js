var express = require('express');
var cache = require('memory-cache');

var router = express.Router();

router.get('/', function(req, res) {
    if (req.signedCookies.key) res.clearCookie('key', { });
    res.render('index', {});
});

router.get('/buy', function(req, res) {
    res.render('buy', {});
});
/*name,phone number,email,address line, city,state/province, country (dropdown), pin code
recepient name, phone number, email,  address line, city,state/province country (dropdown), pin code*/
router.post('/buy', function (req, res){
    if (req.signedCookies.key) res.clearCookie('key', { });
    var quantity = req.body.dropdown;
    var orderType = req.body.described;
    var newOrder = [];
    for (var i = 0;i < quantity; i++) {
        newOrder[i] = {};
    }
    if (req.body.checkBox) {
        req.body.rname2 = req.body.rname1;
        req.body.rnumber2 = req.body.rnumber1;
        req.body.remail2 = req.body.remail1;
        req.body.raddress2 = req.body.raddress1;
        req.body.rcity2 = req.body.rcity1;
        req.body.rstate2 = req.body.rstate1;
        req.body.rcountry2 = req.body.rcountry1;
        req.body.rmessage2 = req.body.rmessage1;
        req.body.rname3 = req.body.rname1;
        req.body.rnumber3 = req.body.rnumber1;
        req.body.remail3 = req.body.remail1;
        req.body.raddress3 = req.body.raddress1;
        req.body.rcity3 = req.body.rcity1;
        req.body.rstate3 = req.body.rstate1;
        req.body.rcountry3 = req.body.rcountry1;
        req.body.rmessage3 = req.body.rmessage1;
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
            newOrder[i].date = new Date().toJSON();
            if (i == 0){
                newOrder[i].rName = req.body.rname1;
                newOrder[i].rNumber = req.body.rnumber1;
                newOrder[i].rEmail = req.body.remail1;
                newOrder[i].rAddress = req.body.raddress1;
                newOrder[i].rCity = req.body.rcity1;
                newOrder[i].rState = req.body.rstate1;
                newOrder[i].rCountry = req.body.rcountry1;
                newOrder[i].rMessage = req.body.rmessage1;
            }
            else if (i == 1){
                newOrder[i].rName = req.body.rname2;
                newOrder[i].rNumber = req.body.rnumber2;
                newOrder[i].rEmail = req.body.remail2;
                newOrder[i].rAddress = req.body.raddress2;
                newOrder[i].rCity = req.body.rcity2;
                newOrder[i].rState = req.body.rstate2;
                newOrder[i].rCountry = req.body.rcountry2;
                newOrder[i].rMessage = req.body.rmessage2;
            }
            else {
                newOrder[i].rName = req.body.rname3;
                newOrder[i].rNumber = req.body.rnumber3;
                newOrder[i].rEmail = req.body.remail3;
                newOrder[i].rAddress = req.body.raddress3;
                newOrder[i].rCity = req.body.rcity3;
                newOrder[i].rState = req.body.rstate3;
                newOrder[i].rCountry = req.body.rcountry3;
                newOrder[i].rMessage = req.body.rmessage3;
            }
        }
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        var key = getRandomInt(0,10000).toString();
        cache.put(key, newOrder, 86400000);
        res.cookie('key', key, {maxAge: 86400000, signed: true});
        //TODO - Add URLs!
        if (quantity == 1) {
            switch (orderType) {
                    case 'ChillyChocolate' : res.redirect('');
                                            break;
                    case 'LoveLetter'      : res.redirect('');
                                            break;
                    case 'GlitterBomb'     : res.redirect('');
                                            break;
                    case 'GlitterEnvelope' : res.redirect('');
                                            break;
                    }
        }
        else if (quantity == 2) {
         switch (orderType) {
                    case 'ChillyChocolate' : res.redirect('');
                                            break;
                    case 'LoveLetter'      : res.redirect('');
                                            break;
                    case 'GlitterBomb'     : res.redirect('');
                                            break;
                    case 'GlitterEnvelope' : res.redirect('');
                                            break;
                    }
        }
        else if (quantity == 3){
            switch (orderType) {
                    case 'ChillyChocolate' : res.redirect('');
                                            break;
                    case 'LoveLetter'      : res.redirect('');
                                            break;
                    case 'GlitterBomb'     : res.redirect('');
                                            break;
                    case 'GlitterEnvelope' : res.redirect('');
                                            break;
                    }
            }
        }
    else {
        res.render('buy',{response:"Error filling details"});
    }
});

router.get('/finish', function (req, res) {
    if (req.query.type === 'success') {
        if (res.signedCookies.key) {
            var orders = cache.get(res.signedCookies.key);
            var collection = req.db.collection('transactions');
            var onInsert = function (err, orders) {
                if (err) {
                    console.log('Error Storing Transaction');
                }
                else {
                    console.log('Transaction Stored');
                }
                cache.del(res.signedCookies.key);
                if (req.signedCookies.key) res.clearCookie('key', { });
            }
            for (var i = 0; i < orders.length; i++) {
                collection.insert(orders[i], onInsert);
            }
            res.render('success', {});
        }
        else {
            console.log('Transaction Insertion Failed');
        }
    }
    else if (req.query.type === 'cancel') {
        cache.del(res.signedCookies.key);
        if (req.signedCookies.key) res.clearCookie('key', { });
        res.redirect('/');
    }
    else {
        cache.del(res.signedCookies.key);
        if (req.signedCookies.key) res.clearCookie('key', { });
        res.render('failiure', {});
    }
});

module.exports = router;
