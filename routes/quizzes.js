var express = require('express');
var router = express.Router();

router.get('/quizzes', function(req, res, next){
	res.redirect('/quizzes/index');
});

module.exports = router;