import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {AppModule} from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule).
then((success:any)=>console.info("Started Application..."))
.catch((err:any)=>console.error(err));