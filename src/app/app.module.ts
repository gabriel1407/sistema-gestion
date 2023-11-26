import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { GerentComponent } from './gerent/gerent.component';
import { DepartamentComponent } from './departament/departament.component';
=======
import { UsuariosComponent } from './usuarios/usuarios.component';
>>>>>>> 816d4e555717bc6afa0f1360bf15397320ee3d35

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    LoginComponent,
<<<<<<< HEAD
    GerentComponent,
    DepartamentComponent
=======
    UsuariosComponent
>>>>>>> 816d4e555717bc6afa0f1360bf15397320ee3d35
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
