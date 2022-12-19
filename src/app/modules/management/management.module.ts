import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDayComponent } from './components/manage-day/manage-day.component';
import {ManagementRoutingModule} from "./management-routing.module";
import {SharedModule} from "../shared/shared.module";
import { OrderReportsComponent } from './components/order-reports/order-reports.component';


@NgModule({
  declarations: [
    ManageDayComponent,
    OrderReportsComponent
  ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        SharedModule,
    ]
})
export class ManagementModule { }
