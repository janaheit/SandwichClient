import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderSandwichComponent} from "./components/order-sandwich/order-sandwich.component";

const routes: Routes = [
  {path: '', component: OrderSandwichComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderingRoutingModule { }
