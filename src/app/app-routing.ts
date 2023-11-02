import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { LoginComponent } from './pages/login/login';
import { DashComponent } from './pages/dash/dash';
import { New_Invoice } from './pages/invoice/new/new';
// import { DashboardComponent } from './pages/dash/dash';
// import { New_Invoice } from './pages/home/home';

const routes: Routes = [
  { path: '', redirectTo: '/new-invoice', pathMatch: 'full' },
  { path: 'new-invoice', component: New_Invoice },
  { path: 'reprint/:uid', component: LoginComponent },
  { path: '**', redirectTo: '/new-invoice' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
