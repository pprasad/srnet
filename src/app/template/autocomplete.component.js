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
var AutoComplete = (function () {
    function AutoComplete() {
        //CREATED THE VARIABLES FILTEREDITEMS AND REFELEMENT
        this.filterKey = '';
        this.filteredItems = [];
        this.textChange = new core_1.EventEmitter();
    }
    AutoComplete.prototype.filter = function () {
        if (this.filterKey !== '') {
            this.filteredItems = this.itemlist.filter(function (e) {
                return (e.name.toLowerCase().substr(0, this.filterKey.length) ==
                    this.filterKey.toLowerCase()) == true;
            }.bind(this));
        }
        else {
            this.filteredItems = [];
        }
    };
    AutoComplete.prototype.select = function (item) {
        this.filterKey = item.name;
        this.filteredItems = [];
        this.textChange.emit(item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AutoComplete.prototype, "itemlist", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "textChange", void 0);
    AutoComplete = __decorate([
        core_1.Component({
            selector: 'autocomplete',
            templateUrl: 'app/template/autocomplete.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AutoComplete);
    return AutoComplete;
}());
exports.AutoComplete = AutoComplete;
//# sourceMappingURL=autocomplete.component.js.map