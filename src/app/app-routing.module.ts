import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './core/gaurds/auth.guard.service';
import { NoAuthGuardService } from './core/gaurds/no-auth.guard.service';
import { LoginComponent } from './views/public/login/login.component';
import { RegisterComponent } from './views/public/register/register.component';
import { UsersComponent } from './views/secured/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuardService],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
