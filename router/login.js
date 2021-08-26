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
    //判断当前是否处于登录状态
router.get('/', function(req, res) {
        if (admin.checkToken(req.cookies.token)) {
            // if (req.cookies == 'dadhaonadooadoac') {

        } else {
            res.redirect('/login')
        }
        return res.sendFile(
            path.resolve('../static/index.html')
        )
    })
    //用户登录
    //接口位login
router.post('/', urlencodeParser, function(req, res) {
    var { username, password } = req.body;
    console.log(username, password);
    Users.find({ UserName: username, PassWord: password }, function(err, result) {
        if (result.length == 0) {
            //未匹配到
            res.send(false)
        } else {
            // res.cookie('token', admin.getToken(), { maxAge: 900000, httpOnly: true })
            res.cookie('UserName', username)
            console.log(req.cookies)
            res.send(true)
        }
    })

})

//用户数据库

//注册
router.post('/zuche1', urlencodeParser, function(req, res) {
    // var {username,psw,psw2} = req.body;
    console.log(req.body)
    var { username, psw } = req.body;
    Users.find({
        UserName: username
    }, function(err, result) {
        if (result.length == 0) {
            console.log('不存在')
            Users.insert({
                UserName: username,
                PassWord: psw
            }, (err, inresult) => {
                console.log(inresult)
                if (err) {
                    res.status(500).send("插入数据失败")
                } else {
                    res.send(true)
                }
            })
        } else {
            console.log('存在')
            res.send(false)
        }

    })
})

//导出
module.exports = router