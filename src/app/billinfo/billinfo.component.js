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
const forms_1 = require('@angular/forms');
const itemmaster_service_1 = require('../services/itemmaster.service');
const newuser_service_1 = require('../services/newuser.service');
const billservice_service_1 = require('../services/billservice.service');
const service_menubar_1 = require('../services/service.menubar');
let BillinfoComponent = class BillinfoComponent {
    constructor(fb, service, userService, billService, menubar) {
        this.fb = fb;
        this.service = service;
        this.userService = userService;
        this.billService = billService;
        this.menubar = menubar;
        this.rows = [];
        this.stockrates = [];
        this.rowtemplate = { "id": '', "itemcode": '', "qty": 0, "rate": 0, "amount": 0 };
        this.menubar.routeIsChanging(true);
    }
    ngOnInit() {
        this.init();
        this.rows.push(Object.assign({}, this.rowtemplate));
        this.service.getStockwithRates().subscribe(res => this.stockrates = res);
        this.userService.getUserList().subscribe(res => this.users = res);
    }
    init() {
        this.billEntryForm = this.fb.group({
            billno: [''],
            billdate: [''],
            custid: [''],
            totalamt: [0],
            stocksoild: []
        });
    }
    selected(event, rowId) {
        console.info("Selected Event{}" + event + " index{}" + rowId);
        this.rows[rowId].itemcode = event.code;
        this.rows[rowId].rate = event.rate;
    }
    changQtyEvent(event, rowId) {
        let rate = this.rows[rowId].rate;
        let val = event.target.value;
        if (!isNaN(val)) {
            this.rows[rowId].amount = rate * parseInt(val);
            this.rows[rowId].qty = val;
            this.calculateTotal();
        }
    }
    calculateTotal() {
        let totalamt = 0;
        for (var row in this.rows) {
            totalamt += this.rows[row].amount;
        }
        this.billEntryForm.patchValue({ 'totalamt': totalamt });
    }
    addRowEvent() {
        let rowObj = Object.assign({}, this.rowtemplate);
        this.rows.push(rowObj);
    }
    deleteRowEvent(rowId) {
        let totalamt = this.billEntryForm.value.totalamt;
        totalamt -= this.rows[rowId].amount;
        this.billEntryForm.patchValue({ 'totalamt': totalamt });
        this.rows.splice(rowId, 1);
    }
    newBillNo() {
        this.billService.getAutoBillNo().subscribe(res => this.billEntryForm.patchValue({ "billno": res.BILLNO != null ? res.BILLNO : 1 }));
    }
    save(model) {
        try {
            model.patchValue({ "stocksoild": this.rows });
            let data = JSON.stringify(model.value);
            this.billService.savebillinfo(data).subscribe(res => this.errorMsg = res._body, error => this.errorMsg = error);
        }
        catch (e) {
            console.info("Exception{}" + e);
        }
    }
    onReset() {
        this.init();
        this.rows = [];
        this.rows.push(Object.assign({}, this.rowtemplate));
        this.errorMsg = '';
    }
};
BillinfoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'billinfo.template.html',
        providers: [itemmaster_service_1.ItemMasterService, newuser_service_1.NewUserService, billservice_service_1.BillService]
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, itemmaster_service_1.ItemMasterService, newuser_service_1.NewUserService, billservice_service_1.BillService, service_menubar_1.MenuBarService])
], BillinfoComponent);
exports.BillinfoComponent = BillinfoComponent;
//# sourceMappingURL=billinfo.component.js.map