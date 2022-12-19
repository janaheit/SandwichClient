import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDayComponent } from './components/manage-day/manage-day.component';
import {ManagementRoutingModule} from "./management-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MatOptionModule} from "@angular/material/core";



@NgModule({
  declarations: [
    ManageDayComponent
  ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        SharedModule,
    ]
})
export class ManagementModule { }
