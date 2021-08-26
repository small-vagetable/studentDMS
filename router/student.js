var express = require('express')
var router = express.Router() //功能和app一样
var MongoControl = require('../MongoDB/dbes6').MongoCotrol
var urlencodeParser = require('body-parser').urlencoded({ extended: false })
var moment = require('moment')
var path = require('path')
var cookieControl = require('../cookie')
const admin = new cookieControl()
    //数据库
    //初始化登录用户集合
const Users = new MongoControl('DMS', 'Users')
const student = new MongoControl('DMS', 'Student_Particular')
const SuShe = new MongoControl('DMS', 'SuShe')
const Teacher = new MongoControl('DMS', 'Teacher_Paricular')
const Test_Type = new MongoControl('DMS', 'Test_Type')
    // const SuShe = new MongoControl('DMS', 'SuShe')
    //student路由
    //获取前天发送过来的id查询其信息
router.get('/getStudentMsg', function(req, res) {
        var PeopleIdObj = req.query;
        console.log('Peopl', PeopleIdObj.UserId)
        student.findId(PeopleIdObj.UserId, function(err, result) {
            var susheObj, daoyuanObj
            SuShe.findId(result[0].SuSheID, function(err, resultsushe) {
                // console.log('宿舍对象', resultsushe[0])
                //在学生基本数据中加入宿舍对象
                result[0].susheObj = resultsushe[0]
                    // console.log('全部', result[0])
                res.send(result[0])
            })
        })
    })
    //封装搜索所有用户的方法 合并学生和老师表的结果，返回一个allArr

// var findStudentAll = function(obj) {

// }

var s = function() {
    return 'success'
}
var dd = s()
console.log(dd)
    //获取所有用户的信息
router.get('/getAllUser', function(req, res) {
        var studentArr, TeacherArr, allArr
        var i = 0 //哨兵
        var all = function() {
            if (studentArr.length >= TeacherArr.length) {
                studentArr.push.apply(studentArr, TeacherArr)
                allArr = studentArr
            } else {
                TeacherArr.push.apply(TeacherArr, studentArr)
                allArr = TeacherArr
            }

        }
        student.find({}, function(err, studentresult) {
            studentArr = studentresult
            i++
            if (i == 2) {
                all()
                res.send(allArr)
            }
        })
        Teacher.find({}, function(err, teacherresult) {
            TeacherArr = teacherresult
            i++
            if (i == 2) {
                all()
                res.send(allArr)
            }
        })


    })
    //查询
router.post('/search', urlencodeParser, function(req, res) {
    var username = req.body.username
    console.log(req.body)
    var studentArr, TeacherArr, allArr
    var i = 0 //哨兵
    var all = function() {
        if (studentArr.length >= TeacherArr.length) {
            studentArr.push.apply(studentArr, TeacherArr)
            allArr = studentArr
        } else {
            TeacherArr.push.apply(TeacherArr, studentArr)
            allArr = TeacherArr
        }

    }
    student.find({ Name: username }, function(err, studentresult) {
        studentArr = studentresult
        i++
        if (i == 2) {
            all()
            res.send(allArr)
        }
    })
    Teacher.find({ Name: username }, function(err, teacherresult) {
        TeacherArr = teacherresult
        i++
        if (i == 2) {
            all()
            res.send(allArr)
        }
    })

})



//类别
router.post('/addTestType', urlencodeParser, function(req, res) {
    var type = req.body.typename
    Test_Type.insert({
        Type: type
    }, function(err, result) {})
})
module.exports = router