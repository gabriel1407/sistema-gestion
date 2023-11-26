import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
import { GerentComponent } from './gerent/gerent.component';
import { DepartamentComponent } from './departament/departament.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    LoginComponent,
    GerentComponent,
    DepartamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
