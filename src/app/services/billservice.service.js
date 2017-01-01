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
const Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
let BillService = class BillService {
    constructor(_http) {
        this._http = _http;
        this.GET_NEW_BILL_NO_URL = "/api/get/autobillno";
        this.POST_CUST_BILL_INFO = "/api/save/custbillinfo";
        this.GET_BILL_INFO = "/api/getbilldetails?billno";
    }
    getAutoBillNo() {
        return this._http.get(this.GET_NEW_BILL_NO_URL).map(res => res.json()).catch(this.handleError);
    }
    savebillinfo(model) {
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.info("model" + model);
        return this._http.post(this.POST_CUST_BILL_INFO, model, { headers }).map(res => res).catch(this.handleError);
    }
    getbillinfo(billno) {
        return this._http.get(this.GET_BILL_INFO + "=" + billno).map(res => res.json()).catch(this.handleError);
    }
    handleError(error) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    }
};
BillService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], BillService);
exports.BillService = BillService;
//# sourceMappingURL=billservice.service.js.map