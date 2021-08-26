class CookieControl {
    constructor() {
        this.tokenArr = []
    }
    getToken() {
        var token = ''
        var str = '01234567890zxcvbnmmpoiuytrewqasdfghjkl'
        for (var i = 1; i < 20; i++) {
            if (i % 5 == 0) {
                token += '-'
            } else {
                token += str[parseInt(Math.random() * str.length)]
            }
        }
        this.tokenArr.push(token)
        return this.tokenArr
    }
    checkToken(token) {
        for (var i = 0; i < this.tokenArr.length; i++) {
            if (this.tokenArr[i] == token) {
                return true
            } else {
                return false
            }
        }
    }
    removeToken(token) {
        for (var i = 0; i < this.tokenArr.length; i++) {
            if (this.tokenArr[i] == token) {
                this.tokenArr.splice(i, 1)
                return true
            } else {
                return false
            }
        }
    }
}
module.exports = CookieControl