import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
import { GerentComponent } from './gerent/gerent.component';
import { DepartamentComponent } from './departament/departament.component';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "Password", component: PasswordComponent, pathMatch: "full" },
  { path: "gerent", component: GerentComponent, pathMatch: "full" },
  { path: "departament", component: DepartamentComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
