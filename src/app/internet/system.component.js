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
const newuser_service_1 = require('../services/newuser.service');
let SystemComponent = class SystemComponent {
    constructor(menuBarService, fb, service) {
        this.menuBarService = menuBarService;
        this.fb = fb;
        this.service = service;
        this.systems = [1, 2, 3, 4];
        this.menuBarService.routeIsChanging(true);
    }
    ngOnInit() {
        console.info("Hello......");
        this.systemForm = this.fb.group({
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
        this.rows = ['SystemId', 'Date', 'UserId', 'SysNo', 'Hours', 'StartTime', 'EndTime', 'Amount'];
        this.columns = ['sysid', 'sysdate', 'userid', 'sysno', 'syshour', 'starttime', 'endtime', 'amount'];
        this.service.getUserList().subscribe(res => this.users = res);
        this.updateTable();
    }
    save(model) {
        let data = JSON.stringify(model.value);
        console.info("data{}" + data);
        this.service.savesysinfo(data).subscribe(res => { this.errorMsg = res._body; this.updateTable(); }, error => this.errorMsg = error);
    }
    onDateChanged(event) {
        let date = event.date;
        this.systemForm.value.sysdate = date.year + "-" + date.month + "-" + date.day;
    }
    onUserChanged(event) {
        this.systemForm.value.userid = event.target.value;
    }
    onSystemChanged(event) {
        this.systemForm.value.sysno = event.target.value;
    }
    updateTable() {
        this.service.getsysinfo().subscribe(res => this.sysinfos = res);
    }
    callbackfn(event) {
    }
};
SystemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'system.template.html',
        providers: [newuser_service_1.NewUserService]
    }), 
    __metadata('design:paramtypes', [service_menubar_1.MenuBarService, forms_1.FormBuilder, newuser_service_1.NewUserService])
], SystemComponent);
exports.SystemComponent = SystemComponent;
//# sourceMappingURL=system.component.js.map