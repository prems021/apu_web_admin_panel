import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { LandingComponent } from './pages/Landing_page/main';
import { LoginComponent } from './pages/login/login';
import { DashComponent } from './pages/dash/dash';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'invoice-dash', component: DashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landing-page', component: LandingComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
