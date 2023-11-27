
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';;

declare var $: any; // Declaración de la variable $ como global
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  name: string | undefined;
  is_enabled: boolean = true;

  constructor(private http: HttpClient, private router: Router) {
    this.name = '';
    this.is_enabled = true;
  }

  getCompany() {
    this.http.get('https://www.metcon7.xyz/companies/company/')
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio aquí
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          // Manejar el error aquí
          console.error(error);
        }
      );
  }

  postCompany() {
    const data = {
      name: this.name,
      is_enabled: this.is_enabled
    };

    this.http.post('https://www.metcon7.xyz/companies/company/', data)
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio aquí
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          // Manejar el error aquí
          console.error(error);
        }
      );
  }

  updateCompany(id: number) {
    const data = {
      name: this.name,
      is_enabled: this.is_enabled
    };

    this.http.put(`https://www.metcon7.xyz/companies/company/${id}`, data)
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio aquí
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          // Manejar el error aquí
          console.error(error);
        }
      );
  }

  deleteCompany(id: number) {
    this.http.delete(`https://www.metcon7.xyz/companies/company/${id}`)
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio aquí
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          // Manejar el error aquí
          console.error(error);
        }
      );
  }
   modal() {
    $("#modalDeleteCar").modal("show");
  }
}
