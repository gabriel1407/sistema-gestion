import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
import { GerentComponent } from './gerent/gerent.component';
import { DepartamentComponent } from './departament/departament.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CompanyComponent } from './company/company.component';
import { EmployeeComponent } from './employee/employee.component';
import { NewDepartamentComponent } from './new-departament/new-departament.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewEmployeComponent } from './new-employe/new-employe.component';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "Password", component: PasswordComponent, pathMatch: "full" },
  { path: "gerent", component: GerentComponent, pathMatch: "full" },
  { path: "departament", component: DepartamentComponent, pathMatch: "full" },
  { path: "employee", component: EmployeeComponent, pathMatch: "full" },
  { path: "Password", component: PasswordComponent, pathMatch: "full" },
  { path: "Usuario", component: UsuariosComponent, pathMatch: "full" },
  { path: "Compañia", component: CompanyComponent, pathMatch: "full" },
  { path: "new-departament", component: NewDepartamentComponent, pathMatch: "full" },
  { path: "new-task", component: NewTaskComponent, pathMatch: "full" },
  { path: "new-employee", component: NewEmployeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
