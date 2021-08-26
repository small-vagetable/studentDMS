var express = require('express')
var router = express.Router() //功能和app一样
var MongoControl = require('../MongoDB/dbes6').MongoCotrol
var urlencodeParser = require('body-parser').urlencoded({ extended: false })
var moment = require('moment')
var path = require('path')
var cookieControl = require('../cookie')
const { ObjectID, ObjectId } = require('mongodb')
const admin = new cookieControl()
    //数据库
    //初始化登录用户集合
const Users = new MongoControl('DMS', 'Users')
const student = new MongoControl('DMS', 'Student_Particular')
const SuShe = new MongoControl('DMS', 'SuShe')
const Teacher = new MongoControl('DMS', 'Teacher_Paricular')
const Test_Type = new MongoControl('DMS', 'Test_Type')
const Class = new MongoControl('DMS', 'Student_Class')
const Score = new MongoControl('DMS', 'Student_score')
const Course = new MongoControl('DMS', 'Course')

//========班级
//=====增加
router.post('/addClass', urlencodeParser, function(req, res) {
        var className = req.body.className
        Class.insert({ ClassName: className }, function() {

        })
    })
    //删除
router.get('/deleteClass', function(req, res) {

    })
    //查
router.get('/findClass', function(req, res) {
        Class.find({}, function(err, result) {
            res.send(result)
        })
    }) //change
router.get('/changeClass', function(req, res) {

})
console.log(Score.insert)
    //=====================成绩
    //添加
router.post('/addScore', urlencodeParser, function(req, res) {
    var { StudentId, course, score, start } = req.body
    var idobj = ObjectId(course)
    var data = {
        StudentId: StudentId,
        CourseId: idobj,
        Score: score,
        GetTime: start
    }
    Score.insert(data, function(err, result) {
        res.send(true)
    })
})

//==============课程
router.get('/getCourse', function(req, res) {
    Course.find({}, function(err, result) {
        res.send(result)
    })
})
router.post('/addCourse', urlencodeParser, function(req, res) {
    var {classid,start,end,coursename,score} = req.body
    console.log(req.body)
sid
    console.log(typeof(classid))
    var idobj = ObjectId(classid)
    console.log(typeof(idobj))
    var date = {
        ClassId:idobj,
        CreateTime:start,
        EndTime:end,
        CourseName:coursename,
        score:score
    }
    // console.log(date)
        Course.insert(date, function(err, result) {
            res.send(result)
        })
})

module.exports = router