import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSandwichComponent } from './components/order-sandwich/order-sandwich.component';
import {OrderingRoutingModule} from "./ordering-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    OrderSandwichComponent
  ],
  imports: [
    CommonModule,
    OrderingRoutingModule,
    SharedModule,
  ]
})
export class OrderingModule { }
