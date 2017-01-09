"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var NewUserService = (function () {
    function NewUserService(http) {
        this.http = http;
        this.GET_URL = "/api/savenetuser";
        this.SAVE_URL = "/api/savenetuser";
        this.GET_URL_USER = "/api/getuserlist";
        this.SAVE_URL_SYSINFO = "/api/save/sysinfo";
        this.GET_URL_SYSINFO = "/api/get/sysinfo";
        this.DEL_URL_SYSINFO = "/api/get/removesysinfo?sysid";
        this.DEL_URL_USER = "/api/get/deleteuser?userid";
    }
    NewUserService.prototype.getList = function () {
        console.info("============Gelist====================");
        return this.http.get(this.GET_URL).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    NewUserService.prototype.getUserList = function () {
        console.info("============Gelist====================");
        return this.http.get(this.GET_URL_USER).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    NewUserService.prototype.save = function (model) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.SAVE_URL, model, { headers: headers }).map(function (res) { return res; }).catch(this.handleError);
    };
    NewUserService.prototype.savesysinfo = function (model) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.SAVE_URL_SYSINFO, model, { headers: headers }).map(function (res) { return res; }).catch(this.handleError);
    };
    NewUserService.prototype.getsysinfo = function () {
        return this.http.get(this.GET_URL_SYSINFO).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    NewUserService.prototype.deletesysinfo = function (sysid) {
        return this.http.delete(this.DEL_URL_SYSINFO + "=" + sysid).map(function (res) { return res; }).catch(this.handleError);
    };
    NewUserService.prototype.deleteuser = function (userid) {
        return this.http.delete(this.DEL_URL_USER + "=" + userid).map(function (res) { return res; }).catch(this.handleError);
    };
    NewUserService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    NewUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NewUserService);
    return NewUserService;
}());
exports.NewUserService = NewUserService;
//# sourceMappingURL=newuser.service.js.map