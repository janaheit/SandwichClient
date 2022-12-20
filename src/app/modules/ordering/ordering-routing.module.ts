import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderSandwichComponent} from "./components/order-sandwich/order-sandwich.component";
import {ViewOrdersComponent} from "./components/view-orders/view-orders.component";

const routes: Routes = [
  {path: '', component: OrderSandwichComponent},
  {path: 'view', component: ViewOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderingRoutingModule { }
