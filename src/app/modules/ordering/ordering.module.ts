import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSandwichComponent } from './components/order-sandwich/order-sandwich.component';
import {OrderingRoutingModule} from "./ordering-routing.module";
import {SharedModule} from "../shared/shared.module";
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';



@NgModule({
  declarations: [
    OrderSandwichComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    OrderingRoutingModule,
    SharedModule,
  ]
})
export class OrderingModule { }
