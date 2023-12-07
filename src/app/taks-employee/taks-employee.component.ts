import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-taks-employee',
  templateUrl: './taks-employee.component.html',
  styleUrls: ['./taks-employee.component.css']
})
export class TaksEmployeeComponent {
  tasks: any[] = [];
  newTask: string = '';
  loading: boolean = false;
  selectedTask: any;
  userName: any;
  last_name:any;
  userId:any;
  email:any;
  
  constructor(private http: HttpClient, private router: Router, private elementRef: ElementRef) {
    this.userName = localStorage.getItem('first_name');
    this.last_name = localStorage.getItem('last_name');
    this.userId = localStorage.getItem('userId');
    this.email = localStorage.getItem('email');
  }
  
  ngOnInit() {
    this.loading = false; 
  }

  getTasks() {
    const userId = localStorage.getItem('userId');
    this.loading = true; // Activar el indicador de carga
    const endpoint = `https://www.metcon7.xyz/task/task/?user=${userId}`;
    this.http.get<any[]>(endpoint).subscribe(
      (response) => {
        this.loading = false; // Desactivar el indicador de carga cuando se complete la solicitud
        this.tasks = response;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
        this.loading = false; // Asegúrate de desactivar el indicador de carga en caso de error
      }
    );
  }

  logout(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const logoutUrl = `https://www.metcon7.xyz/companies/logout/${userId}/`;

      this.http.post(logoutUrl, {}).subscribe(
        () => {
          localStorage.removeItem('userId'); // Borrar el ID de usuario del localStorage
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        },
        (error) => {
          console.error('Error al cerrar sesión:', error);
        }
      );
    } else {
      console.error('No se encontró el ID de usuario en el localStorage');
    }
  }
  
}
