import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { GerentComponent } from './gerent/gerent.component';
import { DepartamentComponent } from './departament/departament.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';
import { NewproyectComponent } from './newproyect/newproyect.component';
import { NewDepartamentComponent } from './new-departament/new-departament.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewEmployeComponent } from './new-employe/new-employe.component';
import { NewProyectGerentComponent } from './new-proyect-gerent/new-proyect-gerent.component';


@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    LoginComponent,
    GerentComponent,
    DepartamentComponent,
    UsuariosComponent,
    EmployeeComponent,
    CompanyComponent,
    NewproyectComponent,
    NewDepartamentComponent,
    NewTaskComponent,
    NewEmployeComponent,
    NewProyectGerentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
