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
const service_menubar_1 = require('../services/service.menubar');
const itemmaster_service_1 = require('../services/itemmaster.service');
let StockEntryComponent = class StockEntryComponent {
    constructor(menuBarService, fb, service) {
        this.menuBarService = menuBarService;
        this.fb = fb;
        this.service = service;
        this.stockTypes = [{ "id": "pkt", "value": "Packets" }, { "id": "nos", "value": "Pieces" }, { "id": "bundel", "value": "Bundel" }];
        this.rows = [];
        this.columns = [];
        this.menuBarService.routeIsChanging(true);
    }
    ngOnInit() {
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
        this.service.getItemCodes().subscribe(res => this.itemMasters = res);
        this.rows = ['StockId', 'Date', 'ItemCode', 'Unit', 'Quantity', 'Price', 'Rate', 'Amount'];
        this.columns = ['stockid', 'stockdate', 'itemcode', 'stockunit', 'itemqty', 'itemprice', 'itemrate', 'totalprice'];
        this.updatetableModel(this.stockEntryForm);
    }
    save(model) {
        let data = JSON.stringify(model.value);
        console.info("data{}" + data);
        this.service.saveStock(data).subscribe(res => this.errorMsg = res._body, error => this.errorMsg = error);
        this.updatetableModel(model);
    }
    onItemPriceChange(event) {
        let val = event.target.value;
        let total = parseInt(this.stockEntryForm.value.itemqty) * parseInt(val);
        this.stockEntryForm.patchValue({ totalprice: total });
    }
    updatetableModel(model) {
        let obj = model.value;
        if (obj.stockid == '') {
            this.service.getStockList().subscribe(res => this.stockentrys = res);
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
    }
    callbackfn(event) {
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
    }
};
StockEntryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'stockentry.component.html',
        providers: [itemmaster_service_1.ItemMasterService]
    }), 
    __metadata('design:paramtypes', [service_menubar_1.MenuBarService, forms_1.FormBuilder, itemmaster_service_1.ItemMasterService])
], StockEntryComponent);
exports.StockEntryComponent = StockEntryComponent;
//# sourceMappingURL=stockentry.component.js.map