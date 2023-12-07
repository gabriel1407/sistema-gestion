import { Component, OnInit} from '@angular/core';
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
  message?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string;
  userId: any;
  userRol: any;
  password: string;
  errorMessage: string;
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.userId = localStorage.getItem('userId');
    this.userRol = localStorage.getItem('rol');
  }
  ngOnInit(): void {
    if (this.userId !== '' && this.userId !== null) {
      if(this.userRol=='1'){
        this.router.navigate(['/gerent']);
      }
    }
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
      localStorage.setItem('rol', response.data.rol.id);

      if (id === 1) {
        this.router.navigate(['/gerent']);
      } else {
        this.router.navigate(['/employee_task']);
      }
    } else {
      console.log('Login error');
      const errorMessage = response.message; // Accede al mensaje de error

      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: errorMessage // Utiliza el mensaje de error proporcionado por el servicio
      });
    }
  }, (error: HttpErrorResponse) => {
    console.error('Login error', error);

    const errorMessage = error.error.message; // Accede al mensaje de error

    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: errorMessage // Utiliza el mensaje de error proporcionado por el servicio
    });
  });
}
}