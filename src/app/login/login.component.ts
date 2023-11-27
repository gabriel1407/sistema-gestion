import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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
    username: string;
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

  constructor(private http: HttpClient, private router: Router) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }

  forgotPassword() {
  const storedUsername = localStorage.getItem('username');
  console.log(storedUsername);
  if (storedUsername) {
    const body = { username: storedUsername };
    const endpoint = `https://www.metcon7.xyz/companies/change_password/`;

    this.http.post(endpoint, body).subscribe(
      (response) => {
        console.log('Solicitud de cambio de contraseña enviada:', response);
      },
      (error) => {
        console.error('Error al enviar la solicitud de cambio de contraseña:', error);
      }
    );
  } else {
    // Agregar código adicional en caso de que el nombre de usuario no esté almacenado en el localStorage
  }
}

  login() {
    console.log(this.username);
    console.log(this.password);

    this.http.post<LoginResponse>('https://www.metcon7.xyz/companies/login/', {
      username: this.username,
      password: this.password
    }).subscribe(response => {
      console.log('Login response', response);

      if (response.access === true) {
        const id = parseInt(response.data.rol.id, 10);

        // Guardar los datos en el localStorage
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('first_name', response.data.first_name);
        localStorage.setItem('last_name', response.data.last_name);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('username', response.data.username);

        if (id === 1) {
          this.router.navigate(['/gerent']);
        } else {
          this.router.navigate(['/gerent']);
        }
      } else {
        console.log('Login error');

        if (response.status === 400) {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'El usuario no existe'
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Credenciales inválidas'
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