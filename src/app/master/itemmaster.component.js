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
const service_menubar_1 = require('../services/service.menubar');
let ItemMasterComponent = class ItemMasterComponent {
    constructor(fb, service, menubar) {
        this.fb = fb;
        this.service = service;
        this.menubar = menubar;
        this.menubar.routeIsChanging(true);
    }
    ngOnInit() {
        this.itemMasterForm = this.fb.group({
            itemId: [''],
            itemCode: ['', forms_1.Validators.required],
            itemName: ['', forms_1.Validators.required],
            itemDesc: ['', forms_1.Validators.required]
        });
        this.rows = ['ItemId', 'ItemCode', 'ItemName', 'ItemDesc'];
        this.columns = ['itemId', 'itemCode', 'itemName', 'itemDesc'];
        this.updateDataTable();
    }
    updateDataTable() {
        this.service.getList().subscribe(resItemMaster => this.itemMasters = resItemMaster);
    }
    save(model) {
        console.info("model{}" + JSON.stringify(model.value));
        let data = JSON.stringify(model.value);
        this.object.itemCode = model.value.itemCode;
        this.object.itemName = model.value.itemName;
        this.object.itemDesc = model.value.itemDesc;
        this.service.save(data).subscribe(res => { this.updateDataTable(); }, error => this.errorMsg = error);
    }
    callbackfn(event) {
        if (event != null) {
            this.object = event;
            this.itemMasterForm.setValue({ 'itemId': event.itemId, 'itemCode': event.itemCode, 'itemName': event.itemName, "itemDesc": event.itemDesc });
        }
    }
};
ItemMasterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'itemmaster.component.html',
        providers: [itemmaster_service_1.ItemMasterService]
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, itemmaster_service_1.ItemMasterService, service_menubar_1.MenuBarService])
], ItemMasterComponent);
exports.ItemMasterComponent = ItemMasterComponent;
//# sourceMappingURL=itemmaster.component.js.map