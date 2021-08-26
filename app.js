const express = require('express') //引入
    //初始化express模块的app
const app = express()
    //引入body-parser
const bodyParser = require('body-parser')
    //初始化urlencoded解析器
const urlencodeParser = bodyParser.urlencoded({ extended: false })
    //引入cookieparser模块
const cookieParser = require('cookie-parser')
    //引入自己实现的MonControl
const MongoControl = require('./MongoDB/dbes6').MongoCotrol
    //初始化登录用户集合
const Users = new MongoControl('DMS', 'Users') //评论集合
    //引入ejs模块
const ejs = require('ejs')
    //引入moment模块处理时间
const moment = require('moment')
    //引入时间模块
const sd = require('silly-datetime');
//引入marked
const marked = require('marked')
    //为请求添加中间件：解析cookie
app.use(cookieParser())
    //处理静态文件
app.use(express.static('./static'))
    //后端路由
app.use('/login', require('./router/login'))
app.use('/student', require('./router/student'))
app.use('/teacher', require('./router/teacher'))
    //app.get('/login') //用户登录界面 =》用户登录，用户注册，修改密码
    //app.post('/admin/submitPage')

app.get('/getUserMsg', function(req, res) {
    var UserName = req.cookies.UserName;
    Users.find({ UserName: UserName }, function(err, result) {
        console.log(result[0].PeopleId)
        res.send({
            UserName: UserName,
            PeopleId: result[0].PeopleId
        })
    })
    console.log("cookies.UserName", UserName)
})
app.get('formtest', function(req, res) {
    res.send('请求成功')
})
app.get('/getTime', function(req, res) {
    var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    console.log(req.query.time)
    res.send(time)
})
app.get('/getTest', function(req, res) {
    var { username, password } = req.query;
    console.log(username, password);
    res.send('成功')
})

//用户成绩等级
var scoreType = function(score){
    var str = ""
switch (parseInt(score/10)) {
    
    case 10:
    case 9:
        str =  "优秀"
    break;
    case 8:
    case 7 :
        str =  "良"
        break;
    case 6:
        str = "及格"
    default:
        str = "不及格"
        break;
}
    return str
}

function CArray(numElements) {
	this.dataStore = [];
	this.pos = 0;
	this.numElements = numElements;
	this.insert = insert;
	this.toString = toString;
	this.clear = clear;
	this.setData = setData;
	this.swap = swap;
	for ( var i = 0; i < numElements; ++i ) {
		this.dataStore[i] = i;
		}
	}

//数组数据的交换
function setData() {
  for ( var i = 0; i < this.numElements; ++i ) {
	 this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
	    }
    } 

function clear() {
 for ( var i = 0; i < this.dataStore.length; ++i ) {
	    this.dataStore[i] = 0;
	    }
    } 

function insert(element) {
    this.dataStore[this.pos++] = element;
    } 

function toString() {
    var restr = "";
    for ( var i = 0; i < this.dataStore.length; ++i ) {
	    retstr += this.dataStore[i] + " ";
	    if (i > 0 & i % 10 == 0) {
		    retstr += "\n";
		    }
	    } 
    return retstr;
    }

  //用于交换数组元素。
    function swap(arr, index1, index2) {
	    var temp = arr[index1];
	    arr[index1] = arr[index2];
	    arr[index2] = temp;
	    }


        //排序算法-冒泡
        function bubbleSort() {
            var numElements = this.dataStore.length;
            var temp;
            for ( var outer = numElements; outer >= 2; --outer) {
                    for ( var inner = 0; inner <= outer - 1; ++inner ) {
                    if (this.dataStore[inner] > this.dataStore[inner + 1]) {
                        swap(this.dataStore, inner, inner + 1);
                        }
                    }
                }
            }
        //选择算法
        function selectionSort() {
            var min, temp;
            for (var outer = 0; outer <= this.dataStore.length-2; ++outer) {
             min = outer;
             for (var inner = outer + 1; inner <= this.dataStore.length-1; ++iner) {
                        if (this.dataStore[inner] < this.dataStore[min]) {
                        min = inner;
                        }
                    swap(this.dataStore, outer, min);
                    }
                }
            }
//监听3000端口
app.listen(3001)
console.log('监听3001端口， 地址 localhost:3001')