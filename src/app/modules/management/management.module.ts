import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDayComponent } from './components/manage-day/manage-day.component';
import {ManagementRoutingModule} from "./management-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ManageDayComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule { }
