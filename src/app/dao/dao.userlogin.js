"use strict";
var UserLogin = (function () {
    function UserLogin() {
    }
    UserLogin.prototype.setUserId = function (userId) {
        this.userId = userId;
    };
    UserLogin.prototype.getUserId = function () {
        return this.userId;
    };
    UserLogin.prototype.setUserName = function (userName) {
        this.userName = userName;
    };
    UserLogin.prototype.getUserName = function () {
        return this.userName;
    };
    UserLogin.prototype.setUserPwd = function (userPwd) {
        this.userPwd = userPwd;
    };
    UserLogin.prototype.getUserPwd = function () {
        return this.userPwd;
    };
    return UserLogin;
}());
exports.UserLogin = UserLogin;
//# sourceMappingURL=dao.userlogin.js.map