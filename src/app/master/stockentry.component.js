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
var forms_1 = require('@angular/forms');
var service_menubar_1 = require('../services/service.menubar');
var itemmaster_service_1 = require('../services/itemmaster.service');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var StockEntryComponent = (function () {
    function StockEntryComponent(menuBarService, fb, service, vcRef, modal) {
        this.menuBarService = menuBarService;
        this.fb = fb;
        this.service = service;
        this.modal = modal;
        this.stockTypes = [{ "id": "pkt", "value": "Packets" }, { "id": "nos", "value": "Pieces" }, { "id": "bundel", "value": "Bundel" }];
        this.rows = [];
        this.columns = [];
        this.modal.overlay.defaultViewContainer = vcRef;
        this.menuBarService.routeIsChanging(true);
    }
    StockEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stockEntryForm = this.fb.group({
            stockid: [''],
            stockdate: ['', forms_1.Validators.required],
            itemcode: ['', forms_1.Validators.required],
            stockunit: ['', forms_1.Validators.required],
            itemqty: [0, forms_1.Validators.required],
            itemprice: [0, forms_1.Validators.required],
            itemrate: [0, forms_1.Validators.required],
            totalprice: [0],
            adjqty: [0]
        });
        this.service.getItemCodes().subscribe(function (res) { return _this.itemMasters = res; });
        this.rows = ['StockId', 'Date', 'ItemCode', 'Unit', 'Quantity', 'Price', 'Rate', 'Amount'];
        this.columns = ['stockid', 'stockdate', 'itemcode', 'stockunit', 'itemqty', 'itemprice', 'itemrate', 'totalprice'];
        this.updatetableModel(this.stockEntryForm);
    };
    StockEntryComponent.prototype.save = function (model) {
        var _this = this;
        var data = JSON.stringify(model.value);
        this.service.saveStock(data).subscribe(function (res) { _this.errorMsg = res._body; _this.updatetableModel(model); }, function (error) { return _this.errorMsg = error; });
    };
    StockEntryComponent.prototype.onItemPriceChange = function (event) {
        var val = event.target.value;
        if (!isNaN(val)) {
            var total = parseInt(this.stockEntryForm.value.itemqty) * parseInt(val);
            this.stockEntryForm.patchValue({ totalprice: total });
        }
    };
    StockEntryComponent.prototype.updatetableModel = function (model) {
        var _this = this;
        var obj = model.value;
        if (obj.stockid == '') {
            this.service.getStockList().subscribe(function (res) { return _this.stockentrys = res; });
        }
        else {
            this.callObject.stockid = obj.stockid;
            this.callObject.stockdate = obj.stockdate;
            this.callObject.itemcode = obj.itemcode;
            this.callObject.stockunit = obj.stockunit;
            this.callObject.itemqty = obj.itemqty;
            this.callObject.itemprice = obj.itemprice;
            this.callObject.itemrate = obj.itemrate;
            this.callObject.totalprice = obj.totalprice;
        }
    };
    StockEntryComponent.prototype.callbackfn = function (event) {
        if (event != null) {
            this.callObject = event;
            this.adjQty = this.stockEntryForm.value.itemqty;
            this.stockEntryForm.patchValue({
                stockid: this.callObject.stockid,
                stockdate: this.callObject.stockdate,
                itemcode: this.callObject.itemcode,
                stockunit: this.callObject.stockunit,
                itemqty: this.callObject.itemqty,
                itemprice: this.callObject.itemprice,
                itemrate: this.callObject.itemrate,
                totalprice: this.callObject.totalprice,
                adjqty: this.callObject.itemqty
            });
        }
    };
    StockEntryComponent.prototype.removeRow = function (event) {
        var _this = this;
        var val = this.modal.confirm()
            .size('sm')
            .showClose(true)
            .title("Waring Message")
            .body('Do you what Delete Record?')
            .open().then(function (dialog) { return dialog.result; })
            .then(function (result) { return _this.searchAndRemove(event); })
            .catch(function (err) { return console.info("Cancel...."); });
    };
    StockEntryComponent.prototype.searchAndRemove = function (obj) {
        var _this = this;
        this.service.deletestock(obj.stockid).subscribe(function (res) { return _this.updatetableModel(_this.stockEntryForm); });
    };
    StockEntryComponent.prototype.onReset = function () {
        this.ngOnInit();
        this.errorMsg = '';
    };
    StockEntryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'stockentry.component.html',
            providers: [itemmaster_service_1.ItemMasterService]
        }), 
        __metadata('design:paramtypes', [service_menubar_1.MenuBarService, forms_1.FormBuilder, itemmaster_service_1.ItemMasterService, core_1.ViewContainerRef, bootstrap_1.Modal])
    ], StockEntryComponent);
    return StockEntryComponent;
}());
exports.StockEntryComponent = StockEntryComponent;
//# sourceMappingURL=stockentry.component.js.map