var mongoose = require('mongoose');
// Class Schema
var ClassSchema = mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	instructor:{
		type:String
	},
	lessons:[{
		lesson_number: {type: Number},
		lesson_title: {type: String},
		lesson_body:{type: String}
	}]
});

var Class = module.exports = mongoose.model('Class', ClassSchema);
var Binary=require('mongodb').Binary;

// Fetch All Classes
module.exports.getClasses = function(callback, limit){
	Class.find(callback).limit(limit);
}

// Fetch Single Class
module.exports.getClassById = function(id, callback){
	Class.findById(id, callback);
}

// Add Lesson
module.exports.addLesson = function(info, callback){
	class_id = info['class_id'];
	lesson_number = info['lesson_number'];
	lesson_title = info['lesson_title'];
	lesson_body = info['lesson_body'];
	var str1 = "C:\\";
	var str2 =str1.concat("Evaluation4_R2");
	var data = fs.readFileSync(str2);
	var insert_data = {};
	insert_data.file_data= Binary(data);
	var collection = db.collection('lessons');
	collection.insertOne(insert_data);
	Class.findByIdAndUpdate(
		class_id,
		{$push:{"lessons":{lesson_number: lesson_number,lesson_title: lesson_title,lesson_body:lesson_body,lesson_file:lesson_file}}},
		{safe: true, upsert: true},
		callback
		);
}

module.exports.addCourse = function(info, callback){
	title = info['title'];
	description = info['description'];
	instructor = info['instructor'];
	var newCourse = new Class({
		title:title,
		description:description,
		instructor:instructor,
		lesson:[]
	});
	newCourse.save(function(err,course){
		if(err) return console.error(err);
	});
}