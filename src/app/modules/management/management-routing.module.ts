import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManageDayComponent} from "./components/manage-day/manage-day.component";
import {OrderReportsComponent} from "./components/order-reports/order-reports.component";
import {HistoryComponent} from "./components/history/history.component";

const routes: Routes = [
  {path:'day', component: ManageDayComponent},
  {path:'report', component: OrderReportsComponent},
  {path:'history', component: HistoryComponent},
  {path:'', redirectTo:'/day',  pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
