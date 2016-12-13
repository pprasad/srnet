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
var ItemMasterComponent = (function () {
    function ItemMasterComponent(fb, service) {
        this.fb = fb;
        this.service = service;
    }
    ItemMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemMasterForm = this.fb.group({
            itemId: ['', forms_1.Validators.required],
            itemName: ['', forms_1.Validators.required],
            itemDesc: ['', forms_1.Validators.required]
        });
        this.service.getList().subscribe(function (resItemMaster) { return _this.itemMasters = resItemMaster; });
    };
    ItemMasterComponent.prototype.save = function (model) {
        var _this = this;
        console.info("model{}" + JSON.stringify(model.value));
        var data = JSON.stringify(model.value);
        this.service.save(data).subscribe(function (res) { console.info(res); }, function (error) { return _this.errorMsg = error; });
    };
    ItemMasterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'itemmaster.component.html',
            providers: [itemmaster_service_1.ItemMasterService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, itemmaster_service_1.ItemMasterService])
    ], ItemMasterComponent);
    return ItemMasterComponent;
}());
exports.ItemMasterComponent = ItemMasterComponent;
//# sourceMappingURL=itemmaster.component.js.map