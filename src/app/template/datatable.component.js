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
let length = 0;
let DataTable = class DataTable {
    constructor() {
        this.rowChanged = new core_1.EventEmitter();
        this.rowRemoved = new core_1.EventEmitter();
        this.isCallback = true;
        this.displayItems = [];
        this.itemsPerPage = 5;
        this.totalPages = 0;
        this.currentPage = 0;
        this.nextVisiable = "visible";
    }
    ngOnInit() {
        console.info(this.itemlist);
    }
    ngAfterViewChecked() {
        window.setTimeout(() => this.init(), 0);
    }
    init() {
        if (this.itemlist != undefined && (this.isCallback || length != this.itemlist.length)) {
            this.isCallback = false;
            length = this.itemlist.length;
            this.totalSize = this.itemlist.length;
            this.totalPages = Math.ceil(this.totalSize / this.itemsPerPage);
            this.totalPages = (this.totalPages == 0) ? (this.totalPages += 1) : this.totalPages;
            this.viewUpdateModel(this.currentPage);
        }
    }
    writeValue(value) { }
    registerOnChange(fn) { }
    registerOnTouched(fn) { }
    viewUpdateModel(page) {
        let startIndex = page * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        this.displayItems = [];
        for (let i = startIndex; i < endIndex; i++) {
            if (this.itemlist[i] != undefined) {
                this.displayItems.push(this.itemlist[i]);
            }
        }
    }
    prevPage() {
        this.currentPage -= 1;
        console.info(this.currentPage);
        if (this.currentPage >= 0) {
            this.viewUpdateModel(this.currentPage);
            this.nextVisiable = "visible";
        }
        else {
            this.currentPage = 0;
            this.nextVisiable = "visible";
        }
    }
    nextPage() {
        this.currentPage += 1;
        if (this.currentPage <= this.totalPages - 1) {
            this.viewUpdateModel(this.currentPage);
        }
        else {
            this.currentPage = this.totalPages - 1;
            this.nextVisiable = "none";
        }
    }
    selectedRow(rowId) {
        console.info("rowId{}" + rowId);
        this.rowChanged.emit(this.displayItems[rowId]);
    }
    removeRow(rowId) {
        this.rowRemoved.emit(this.displayItems[rowId]);
    }
};
__decorate([
    core_1.Input('itemlist'), 
    __metadata('design:type', Array)
], DataTable.prototype, "itemlist", void 0);
__decorate([
    core_1.Input('rows'), 
    __metadata('design:type', Array)
], DataTable.prototype, "rows", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], DataTable.prototype, "columns", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], DataTable.prototype, "iseditable", void 0);
__decorate([
    core_1.Output('selectedRow'), 
    __metadata('design:type', core_1.EventEmitter)
], DataTable.prototype, "rowChanged", void 0);
__decorate([
    core_1.Output('removeRow'), 
    __metadata('design:type', core_1.EventEmitter)
], DataTable.prototype, "rowRemoved", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], DataTable.prototype, "isCallback", void 0);
DataTable = __decorate([
    core_1.Component({
        selector: 'datatable',
        templateUrl: `app/template/datatable.template.html`
    }), 
    __metadata('design:paramtypes', [])
], DataTable);
exports.DataTable = DataTable;
//# sourceMappingURL=datatable.component.js.map