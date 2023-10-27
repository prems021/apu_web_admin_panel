import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { LoginComponent } from './pages/login/login';
import { DashComponent } from './pages/dash/dash';
import { View_Invoice_list } from './pages/invoice/view-list/view';
// import { DashboardComponent } from './pages/dash/dash';
// import { HomeComponent } from './pages/home/home';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashComponent },
  { path: 'view-invoices/:token/:type', component: View_Invoice_list },
  { path: 'reprint/:uid', component: LoginComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
