import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ItemMasterComponent} from './master/itemmaster.component';
import {ItemMasterService} from './services/itemmaster.service';
import {NetUserInfoComponent} from './internet/netuser.component';
import {SystemComponent} from './internet/system.component';
import {StockEntryComponent} from './master/stockentry.component';
import {BillinfoComponent} from './billinfo/billinfo.component';
const app_routes:Routes=[
    {path:'',pathMatch:'full',redirectTo:'/login'},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'itemmaster',component:ItemMasterComponent},
    {path:'newuser',component:NetUserInfoComponent},
    {path:'system',component:SystemComponent},
    {path:'stockentry',component:StockEntryComponent},
    {path:'billentry',component:BillinfoComponent}
]
export const app_routing = {
  routes: RouterModule.forRoot(app_routes),
  components:[LoginComponent,HomeComponent,ItemMasterComponent,NetUserInfoComponent,SystemComponent,StockEntryComponent,BillinfoComponent]
};