"use strict";
const router_1 = require('@angular/router');
const login_component_1 = require('./login/login.component');
const home_component_1 = require('./home/home.component');
const itemmaster_component_1 = require('./master/itemmaster.component');
const netuser_component_1 = require('./internet/netuser.component');
const system_component_1 = require('./internet/system.component');
const app_routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'itemmaster', component: itemmaster_component_1.ItemMasterComponent },
    { path: 'newuser', component: netuser_component_1.NetUserInfoComponent },
    { path: 'system', component: system_component_1.SystemComponent }
];
exports.app_routing = {
    routes: router_1.RouterModule.forRoot(app_routes),
    components: [login_component_1.LoginComponent, home_component_1.HomeComponent, itemmaster_component_1.ItemMasterComponent, netuser_component_1.NetUserInfoComponent, system_component_1.SystemComponent]
};
//# sourceMappingURL=app.routers.js.map