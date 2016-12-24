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
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
const Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
let USER_AUTH_URL = "http://localhost/userverify";
let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
        this.USER_AUTH_URL = "/userverify";
    }
    getUserLogin(model) {
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.USER_AUTH_URL, model, { headers }).map(res => res).catch(this.handleError);
    }
    handleError(error) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    }
};
LoginService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map