import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { LoginComponent } from './pages/login/login';
import { DashComponent } from './pages/dash/dash';
import { Invoice_print_a4_type_1 } from './pages/invoice/a4/type1/main';

const routes: Routes = [
  { path: '', redirectTo: '/invoice-dash', pathMatch: 'full' },
  { path: 'invoice-dash', component: DashComponent },
  { path: 'reprint/:uid', component: LoginComponent },
  { path: '**', redirectTo: '/invoice-dash' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
