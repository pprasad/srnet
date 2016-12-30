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
const bootstrap_1 = require('angular2-modal/plugins/bootstrap');
let ItemMasterComponent = class ItemMasterComponent {
    constructor(fb, service, menubar, vcRef, modal) {
        this.fb = fb;
        this.service = service;
        this.menubar = menubar;
        this.modal = modal;
        this.object = null;
        this.modal.overlay.defaultViewContainer = vcRef;
        this.menubar.routeIsChanging(true);
    }
    ngOnInit() {
        this.init();
        this.rows = ['ItemId', 'ItemCode', 'ItemName', 'ItemDesc'];
        this.columns = ['itemId', 'itemCode', 'itemName', 'itemDesc'];
        this.updateDataTable();
    }
    init() {
        this.itemMasterForm = this.fb.group({
            itemId: [''],
            itemCode: ['', forms_1.Validators.required],
            itemName: ['', forms_1.Validators.required],
            itemDesc: ['']
        });
    }
    updateDataTable() {
        this.service.getList().subscribe(resItemMaster => this.itemMasters = resItemMaster);
    }
    save(model) {
        try {
            let data = JSON.stringify(model.value);
            if (this.object != null) {
                this.object.itemCode = model.value.itemCode;
                this.object.itemName = model.value.itemName;
                this.object.itemDesc = model.value.itemDesc;
            }
            this.service.save(data).subscribe(res => { this.errorMsg = res._body; this.updateDataTable(); }, error => this.errorMsg = error);
        }
        catch (e) {
            console.info("Exception" + e);
        }
    }
    callbackfn(event) {
        if (event != null) {
            this.object = event;
            this.itemMasterForm.setValue({ 'itemId': event.itemId, 'itemCode': event.itemCode, 'itemName': event.itemName, "itemDesc": event.itemDesc });
        }
    }
    removeRow(event) {
        let val = this.modal.confirm()
            .size('sm')
            .showClose(true)
            .title("Waring Message")
            .body('Do you what Delete Record?')
            .open().then(dialog => dialog.result)
            .then(result => this.searchAndRemove(event))
            .catch(err => console.info("Cancel...."));
    }
    searchAndRemove(obj) {
        this.service.deleteitem(obj.itemId).subscribe(res => this.updateDataTable());
    }
    onReset() {
        this.init();
        this.errorMsg = '';
    }
};
ItemMasterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'itemmaster.component.html',
        providers: [itemmaster_service_1.ItemMasterService]
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, itemmaster_service_1.ItemMasterService, service_menubar_1.MenuBarService, core_1.ViewContainerRef, bootstrap_1.Modal])
], ItemMasterComponent);
exports.ItemMasterComponent = ItemMasterComponent;
//# sourceMappingURL=itemmaster.component.js.map