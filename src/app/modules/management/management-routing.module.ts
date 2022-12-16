import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManageDayComponent} from "./components/manage-day/manage-day.component";

const routes: Routes = [
  {path:'day', component: ManageDayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
