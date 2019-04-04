var express = require('express');
var router = express.Router();

Class = require('../models/class');
Instructor = require('../models/instructor');
User = require('../models/user');

router.get('/classes', function(req, res, next){
	Instructor.getInstructorByUsername(req.user.username, function(err, instructor){
		if(err) throw err;
		res.render('instructors/classes', {instructor: instructor});
	});
});

router.post('/classes/register', function(req, res){
	info = [];
	info['instructor_username'] = req.user.username;
	info['class_id'] = req.body.class_id;
	info['class_title'] = req.body.class_title;

	Instructor.register(info, function(err, instructor){
		if(err) throw err;
		console.log(instructor);

	});

	req.flash('error_msg', 'You cannot register to this course as an instructor');
	res.redirect('/instructors/classes');
});

router.get('/classes/:id/lessons/new', function(req, res, next){
	res.render('instructors/newlesson',{class_id:req.params.id});
});

router.post('/classes/:id/lessons/new', function(req, res, next){
	// Get Values
	var info = [];
	info['class_id'] = req.params.id;
	info['lesson_number'] = req.body.lesson_number;
	info['lesson_title'] = req.body.lesson_title;
	info['lesson_body'] = req.body.lesson_body;
	info['lesson_file'] = req.body.lesson_file;

	Class.addLesson(info, function(err, lesson){
		console.log('Lesson Added..');
	});

	req.flash('success_msg','Lesson Added');
	res.redirect('/instructors/classes');
});
router.get('/classes/new1', function(req, res, next){
	res.render('instructors/newlesson1');
});

router.post('/classes/new1', function(req, res, next){
	// Get Values
	var info = [];
	info['title'] = req.body.title;
	info['description'] = req.body.description;
	info['instructor'] = req.body.instructor;
	Class.addCourse(info, function(err, lesson){
		console.log('Course Added..');
	});
	/*
	var query = {username: req.body.instructor};
    Instructor.findOneAndUpdate(
      query,
      {$push: {"classes": {class_id: class_id, class_title: class_title}}},
      {safe: true, upsert: true},
      callback
    );*/
	req.flash('success_msg','Lesson Added');
	res.redirect('/instructors/classes');
});


module.exports = router;
