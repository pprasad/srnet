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
var length = 0;
var DataTable = (function () {
    function DataTable() {
        this.rowChanged = new core_1.EventEmitter();
        this.rowRemoved = new core_1.EventEmitter();
        this.isCallback = true;
        this.displayItems = [];
        this.itemsPerPage = 5;
        this.totalPages = 0;
        this.currentPage = 0;
        this.nextVisiable = "visible";
    }
    DataTable.prototype.ngOnInit = function () {
        console.info(this.itemlist);
    };
    DataTable.prototype.ngAfterViewChecked = function () {
        var _this = this;
        window.setTimeout(function () { return _this.init(); }, 0);
    };
    DataTable.prototype.init = function () {
        if (this.itemlist != undefined && (this.isCallback || length != this.itemlist.length)) {
            this.isCallback = false;
            length = this.itemlist.length;
            this.totalSize = this.itemlist.length;
            this.totalPages = Math.ceil(this.totalSize / this.itemsPerPage);
            this.totalPages = (this.totalPages == 0) ? (this.totalPages += 1) : this.totalPages;
            this.viewUpdateModel(this.currentPage);
        }
    };
    DataTable.prototype.writeValue = function (value) { };
    DataTable.prototype.registerOnChange = function (fn) { };
    DataTable.prototype.registerOnTouched = function (fn) { };
    DataTable.prototype.viewUpdateModel = function (page) {
        var startIndex = page * this.itemsPerPage;
        var endIndex = startIndex + this.itemsPerPage;
        this.displayItems = [];
        for (var i = startIndex; i < endIndex; i++) {
            if (this.itemlist[i] != undefined) {
                this.displayItems.push(this.itemlist[i]);
            }
        }
    };
    DataTable.prototype.prevPage = function () {
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
    };
    DataTable.prototype.nextPage = function () {
        this.currentPage += 1;
        if (this.currentPage <= this.totalPages - 1) {
            this.viewUpdateModel(this.currentPage);
        }
        else {
            this.currentPage = this.totalPages - 1;
            this.nextVisiable = "none";
        }
    };
    DataTable.prototype.selectedRow = function (rowId) {
        console.info("rowId{}" + rowId);
        this.rowChanged.emit(this.displayItems[rowId]);
    };
    DataTable.prototype.removeRow = function (rowId) {
        this.rowRemoved.emit(this.displayItems[rowId]);
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
            templateUrl: "app/template/datatable.template.html"
        }), 
        __metadata('design:paramtypes', [])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=datatable.component.js.map