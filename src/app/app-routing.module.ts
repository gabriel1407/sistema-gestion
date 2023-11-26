import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "Password", component: PasswordComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
