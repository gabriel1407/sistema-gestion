import { Component, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerent',
  templateUrl: './gerent.component.html',
  styleUrls: ['./gerent.component.css']
})
export class GerentComponent {
  showDepartament: boolean = false;
  showNewGerent: boolean = true;
  showCompany: boolean= false;
  showProjetc: boolean= false;
  showEmployee: boolean=false;
  showReport: boolean=false;
  userName: any;
  last_name:any;
  email:any;

  constructor(private http: HttpClient, private router: Router, private elementRef: ElementRef) {
    this.userName = localStorage.getItem('first_name');
    this.last_name = localStorage.getItem('last_name');
    this.email = localStorage.getItem('email');
  }

  showDepartamentComponent() {
    this.showDepartament = true;
    this.showNewGerent = false;
    this.showCompany=false;
    this.showProjetc=false;
    this.showEmployee=false;
  }

  showNewGerentComponent() {
    this.showDepartament = false;
    this.showNewGerent = true;
    this.showCompany=false;
    this.showProjetc=false;
    this.showEmployee=false;
  }
  
  showCompanyGerentComponent() {
    this.showDepartament = false;
    this.showNewGerent = false;
    this.showCompany=true;
    this.showProjetc=false;
    this.showEmployee=false;
  }

  showProjectGerentComponent() {
    this.showDepartament = false;
    this.showNewGerent = false;
    this.showCompany=false;
    this.showProjetc=true;
    this.showEmployee=false;
  }

  showEmployeeGerentComponent() {
    this.showDepartament = false;
    this.showNewGerent = false;
    this.showCompany=false;
    this.showProjetc=false;
    this.showEmployee=true;
  }
  
  showReportComponent() {
    this.showReport=true;
    this.showDepartament = false;
    this.showNewGerent = false;
    this.showCompany=false;
    this.showProjetc=false;
    this.showEmployee=false;
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
