var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var ObjectId = mongo.ObjectId
const mongodbUrl = 'mongodb://127.0.0.1:27017'

class MongoCotrol {
    constructor(dbname, collectionName) {
        this.dbname = dbname;
        this.collectionName = collectionName
    }
    _init(callback) {
        MongoClient.connect(mongodbUrl, { userNewUrlParser: true }, (err, client) => {
            if (err) {
                console.log(err)
                return
            }
            var db = client.db(this.dbname)
            callback(null, db.collection(this.collectionName), client)
        })
    }
    find(findQuery, callback) {
        this._init((err, collection, client) => {
            collection.find(findQuery).toArray((err, res) => {
                callback(err, res)
                client.close()
            })

        })
    }
    findId(_id, callback) {
        var objid = ObjectId(_id)
        this.find({ _id: objid }, callback)
    }
    insert(data, callback) {
        this._init((err, collection, client) => {
            collection.insert(data, (err, res) => {
                callback(err, res)
                client.close()
            })
        })
    }
    update(beferObj, changeObj, callback) {
        this._init((err, collection, client) => {
            collection.update(beferObj, { $set: changeObj }, (err, res) => {
                callback(err, res.result)
                client.close()
            })
        })
    }
    updateId(_id, changeObj, callback) {
        var objid = { _id: ObjectId(_id) }
        this.update(objid, changeObj, callback)
    }
    updateMany(beferObj, changeObj, callback) {
        this._init((err, collection, client) => {
            collection.updateMany(beferObj, changeObj, (err, res) => {
                callback(err, res)
                client.close()
            })
        })
    }
    remove(data, callback) {
        this._init((err, collection, client) => {
            collection.remove(data, (err, res) => {
                callback(err, res)
                client.close()
            })
        })
    }
    removeId(_id, callback) {
        var idObj = ObjectId(_id)
        this.remove({ _id: idObj }, callback)
    }
}

// var user = new MongoCotrol('test', 'user')
// user.insert({ name: '随便色号的' }, function(err, res) {
//     console.log(res)
// })

exports.MongoCotrol = MongoCotrol