import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: "/order", pathMatch:'full'},
  { path: 'order', loadChildren: () =>import('./modules/ordering/ordering.module').then(m => m.OrderingModule)},
  { path: 'manage', loadChildren: () =>import('./modules/management/management.module').then(m => m.ManagementModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
