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
var newuser_service_1 = require('../services/newuser.service');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var SystemComponent = (function () {
    function SystemComponent(menuBarService, fb, service, vcRef, modal) {
        this.menuBarService = menuBarService;
        this.fb = fb;
        this.service = service;
        this.modal = modal;
        this.systems = [1, 2, 3, 4];
        this.modal.overlay.defaultViewContainer = vcRef;
        this.menuBarService.routeIsChanging(true);
    }
    SystemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
        this.rows = ['SystemId', 'Date', 'UserId', 'SysNo', 'Hours/Mins', 'StartTime', 'EndTime', 'Amount'];
        this.columns = ['sysid', 'sysdate', 'userid', 'sysno', 'syshour', 'starttime', 'endtime', 'amount'];
        this.service.getUserList().subscribe(function (res) { return _this.users = res; });
        this.updateTable(this.systemForm);
    };
    SystemComponent.prototype.init = function () {
        this.systemForm = this.fb.group({
            sysid: [''],
            userid: ['', forms_1.Validators.required],
            sysno: ['', forms_1.Validators.required],
            sysdate: ['', forms_1.Validators.required],
            syshour: [0, forms_1.Validators.required],
            starttime: ['', forms_1.Validators.required],
            endtime: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            paidamt: [0, forms_1.Validators.required],
            balance: [0, forms_1.Validators.required]
        });
    };
    SystemComponent.prototype.save = function (model) {
        var _this = this;
        var data = JSON.stringify(model.value);
        this.service.savesysinfo(data).subscribe(function (res) { _this.errorMsg = res._body; _this.updateTable(model); }, function (error) { return _this.errorMsg = error; });
    };
    SystemComponent.prototype.onDateChanged = function (event) {
        var date = event.date;
        this.systemForm.value.sysdate = date.year + "-" + date.month + "-" + date.day;
    };
    SystemComponent.prototype.onUserChanged = function (event) {
        this.systemForm.value.userid = event.target.value;
    };
    SystemComponent.prototype.onSystemChanged = function (event) {
        this.systemForm.value.sysno = event.target.value;
    };
    SystemComponent.prototype.updateTable = function (model) {
        var _this = this;
        var obj = model.value;
        if (obj.sysid == null || obj.sysid == '') {
            this.service.getsysinfo().subscribe(function (res) { return _this.sysinfos = res; });
        }
        else {
            this.object.userid = obj.userid;
            this.object.sysno = obj.sysno;
            this.object.sysdate = obj.sysdate;
            this.object.syshour = obj.syshour;
            this.object.startime = obj.starttime;
            this.object.endtime = obj.endtime;
            this.object.amount = obj.amount;
            this.object.paidamt = obj.paidamt;
            this.object.balance = obj.balance;
        }
    };
    SystemComponent.prototype.callbackfn = function (event) {
        this.object = event;
        this.systemForm.patchValue({ sysid: this.object.sysid,
            userid: this.object.userid, sysno: this.object.sysno,
            sysdate: this.object.sysdate, syshour: this.object.syshour,
            starttime: this.object.starttime, endtime: this.object.endtime,
            amount: this.object.amount, paidamt: this.object.paidamt,
            balance: this.object.balance
        });
    };
    SystemComponent.prototype.removeRow = function (event) {
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
    SystemComponent.prototype.searchAndRemove = function (obj) {
        var _this = this;
        this.service.deletesysinfo(obj.sysid).subscribe(function (res) { return _this.updateTable(_this.systemForm); });
    };
    SystemComponent.prototype.onReset = function () {
        this.init();
        this.errorMsg = '';
    };
    SystemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'system.template.html',
            providers: [newuser_service_1.NewUserService, bootstrap_1.Modal]
        }), 
        __metadata('design:paramtypes', [service_menubar_1.MenuBarService, forms_1.FormBuilder, newuser_service_1.NewUserService, core_1.ViewContainerRef, bootstrap_1.Modal])
    ], SystemComponent);
    return SystemComponent;
}());
exports.SystemComponent = SystemComponent;
//# sourceMappingURL=system.component.js.map