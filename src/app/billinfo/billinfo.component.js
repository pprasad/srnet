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
var itemmaster_service_1 = require('../services/itemmaster.service');
var newuser_service_1 = require('../services/newuser.service');
var billservice_service_1 = require('../services/billservice.service');
var service_menubar_1 = require('../services/service.menubar');
var BillinfoComponent = (function () {
    function BillinfoComponent(fb, service, userService, billService, menubar) {
        this.fb = fb;
        this.service = service;
        this.userService = userService;
        this.billService = billService;
        this.menubar = menubar;
        this.rows = [];
        this.stockrates = [];
        this.rowtemplate = { "id": '', "itemcode": '', "itemname": '', "qty": 0, "rate": 0, "amount": 0 };
        this.menubar.routeIsChanging(true);
    }
    BillinfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
        this.rows.push(Object.assign({}, this.rowtemplate));
        this.service.getStockwithRates().subscribe(function (res) { return _this.stockrates = res; });
        this.userService.getUserList().subscribe(function (res) { return _this.users = res; });
    };
    BillinfoComponent.prototype.init = function () {
        this.billEntryForm = this.fb.group({
            billno: [''],
            billdate: [''],
            custid: [''],
            custname: [''],
            totalamt: [0],
            stocksoild: []
        });
    };
    BillinfoComponent.prototype.selected = function (event, rowId) {
        console.info("Selected Event{}" + event + " index{}" + rowId);
        this.rows[rowId].itemcode = event.code;
        this.rows[rowId].itemname = event.name;
        this.rows[rowId].rate = event.rate;
    };
    BillinfoComponent.prototype.changQtyEvent = function (event, rowId) {
        var rate = this.rows[rowId].rate;
        var val = event.target.value;
        if (!isNaN(val)) {
            this.rows[rowId].amount = rate * parseInt(val);
            this.rows[rowId].qty = parseInt(val);
            this.calculateTotal();
            this.updateModal();
        }
    };
    BillinfoComponent.prototype.calculateTotal = function () {
        var totalamt = 0;
        for (var row in this.rows) {
            totalamt += this.rows[row].amount;
        }
        this.billEntryForm.patchValue({ 'totalamt': totalamt });
    };
    BillinfoComponent.prototype.addRowEvent = function () {
        var rowObj = Object.assign({}, this.rowtemplate);
        this.rows.push(rowObj);
        this.updateModal();
    };
    BillinfoComponent.prototype.deleteRowEvent = function (rowId) {
        var totalamt = this.billEntryForm.value.totalamt;
        totalamt -= this.rows[rowId].amount;
        this.billEntryForm.patchValue({ 'totalamt': totalamt });
        this.rows.splice(rowId, 1);
        this.updateModal();
    };
    BillinfoComponent.prototype.newBillNo = function () {
        var _this = this;
        this.billService.getAutoBillNo().subscribe(function (res) { return _this.billEntryForm.patchValue({ "billno": res.BILLNO != null ? res.BILLNO : 1 }); });
    };
    BillinfoComponent.prototype.save = function (model) {
        var _this = this;
        try {
            model.patchValue({ "stocksoild": this.rows });
            var data = JSON.stringify(model.value);
            this.billService.savebillinfo(data).subscribe(function (res) { return _this.errorMsg = res._body; }, function (error) { return _this.errorMsg = error; });
        }
        catch (e) {
            console.info("Exception{}" + e);
        }
    };
    BillinfoComponent.prototype.onReset = function () {
        this.init();
        this.rows = [];
        this.rows.push(Object.assign({}, this.rowtemplate));
        this.errorMsg = '';
    };
    BillinfoComponent.prototype.onSearch = function () {
        var _this = this;
        var billno = this.billEntryForm.value.billno;
        var obj = this.billEntryForm;
        this.billService.getbillinfo(billno).subscribe(function (res) {
            obj.patchValue({ billdate: res.billdate, custid: res.custid, stocksoild: res.stocksoild, totalamt: res.totalamt, custname: res.custname });
            _this.rows = res.stocksoild;
        });
    };
    BillinfoComponent.prototype.custidChangeEvent = function (event) {
        var index = event.target.selectedIndex;
        this.billEntryForm.patchValue({ custname: event.target[index].text });
    };
    BillinfoComponent.prototype.updateModal = function () {
        this.billEntryForm.patchValue({ "stocksoild": this.rows });
    };
    BillinfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'billinfo.template.html',
            providers: [itemmaster_service_1.ItemMasterService, newuser_service_1.NewUserService, billservice_service_1.BillService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, itemmaster_service_1.ItemMasterService, newuser_service_1.NewUserService, billservice_service_1.BillService, service_menubar_1.MenuBarService])
    ], BillinfoComponent);
    return BillinfoComponent;
}());
exports.BillinfoComponent = BillinfoComponent;
//# sourceMappingURL=billinfo.component.js.map