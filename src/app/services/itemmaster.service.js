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
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var ItemMasterService = (function () {
    function ItemMasterService(_http) {
        this._http = _http;
        this.GET_URL = "/api/getitemmaster";
        this.SAVE_URL = "/api/saveitemmaster";
        this.GET_ITEM_CODES = "/api/getitemcodes";
        this.SAVE_STOCK_URL = "/api/save/stockentry";
        this.GET_STOCK_URL = "/api/get/stockentry";
        this.GET_STOCK_RATES_URL = "/api/get/stockitemswithrate";
        this.DELETE_ITEM_URL = "/api/delete/item?itemid";
        this.DELETE_STOCK_URL = "/api/delete/stock?stockid";
    }
    ItemMasterService.prototype.getList = function () {
        console.info("============Gelist====================");
        return this._http.get(this.GET_URL).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ItemMasterService.prototype.save = function (model) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.info("model" + model);
        return this._http.post(this.SAVE_URL, model, { headers: headers }).map(function (res) { return res; }).catch(this.handleError);
    };
    ItemMasterService.prototype.getItemCodes = function () {
        return this._http.get(this.GET_ITEM_CODES).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ItemMasterService.prototype.saveStock = function (model) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.info("model" + model);
        return this._http.post(this.SAVE_STOCK_URL, model, { headers: headers }).map(function (res) { return res; }).catch(this.handleError);
    };
    ItemMasterService.prototype.getStockList = function () {
        return this._http.get(this.GET_STOCK_URL).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ItemMasterService.prototype.getStockwithRates = function () {
        return this._http.get(this.GET_STOCK_RATES_URL).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ItemMasterService.prototype.deleteitem = function (itemid) {
        return this._http.delete(this.DELETE_ITEM_URL + "=" + itemid).map(function (res) { return res; }).catch(this.handleError);
    };
    ItemMasterService.prototype.deletestock = function (stockid) {
        return this._http.delete(this.DELETE_STOCK_URL + "=" + stockid).map(function (res) { return res; }).catch(this.handleError);
    };
    ItemMasterService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    ItemMasterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ItemMasterService);
    return ItemMasterService;
}());
exports.ItemMasterService = ItemMasterService;
//# sourceMappingURL=itemmaster.service.js.map