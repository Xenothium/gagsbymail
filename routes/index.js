var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gags By Mail' });
});

router.get('/success', function (req, res) {
    res.render('success', {});
});

router.get('/failiure', function (req,res) {
    res.render('failiure', {});
});

router.get('/cancel', function (req,res) {
    res.redirect('index', {title: 'Gags By Mail'});
});

module.exports = router;
