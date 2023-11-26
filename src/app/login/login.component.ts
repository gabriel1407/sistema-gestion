import { Component, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
interface LoginResponse {
  status: number;
  access: boolean;
  data: {
    rol: {
      id: string;
    };
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  user: {
    name: string;
    email: string;
  };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage: string;
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router, private elementRef: ElementRef) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }

  forgotPassword() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      const body = { username: storedUsername };
      const endpoint = `https://143.198.30.242/companies/change_password/`;

      this.http.post(endpoint, body).subscribe(
        (response) => {
          console.log('Solicitud de cambio de contraseña enviada:', response);
        },
        (error) => {
          console.error('Error al enviar la solicitud de cambio de contraseña:', error);
        }
      );
    }
  }

  login(): void {
    console.log(this.username);
    console.log(this.password);
    this.http.post<LoginResponse>(`https://143.198.30.242/companies/login/`, {
      username: this.username,
      password: this.password
    }).subscribe(response => {
      console.log('Login response', response);
      if (response.access === true) {
        let id: number | undefined;
        if (response && response.data && response.data.rol && response.data.rol.id) {
          id = parseInt(response.data.rol.id, 10);
          
          // // Guardar los datos en el localStorage
          // localStorage.setItem('userId', String(id));
          // localStorage.setItem('username', response.user.name);
          // localStorage.setItem('email', response.user.email);
          
          if (id === 1) {
            // Guardar los datos en el localStorage
            localStorage.setItem('userId', String(response.data.id));
            localStorage.setItem('username', response.data.first_name);
            localStorage.setItem('Userlast_name', response.data.last_name);
            localStorage.setItem('email', response.data.email);
            this.router.navigate(['/message']);
          } else {
            // Guardar los datos en el localStorage
            localStorage.setItem('userId', String(response.data.id));
            localStorage.setItem('username', response.data.first_name);
            localStorage.setItem('Userlast_name', response.data.last_name);
            localStorage.setItem('email', response.data.email);
            this.router.navigate(['/message-cliente']);
          }
        }
      } else {
        console.log('Login error');
        if (response.status === 400) {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'El usuario no existe',
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Credenciales inválidas',
          });
        }
      }
    }, (error: HttpErrorResponse) => {
      console.error('Login error', error);
      if (error.status === 400) {
        this.errorMessage = 'El usuario no existe';
      } else {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }  
}
