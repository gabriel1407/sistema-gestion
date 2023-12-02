
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';;
import Swal from 'sweetalert2';
declare var $: any; // Declaración de la variable $ como global
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  name: string | undefined;
  is_enabled: boolean = true;
  userId: string | null;
  company: any[] = [];
  status: boolean;
  listStatus: { name: string, value: boolean }[] = [
    { name: "ACTIVO", value: true },
    { name: "INACTIVO", value: false }
  ]
  data: any; // Variable para almacenar los datos de respuesta del servicio

  constructor(private http: HttpClient, private router: Router) {
    this.name = '';
    this.status = false;
    this.userId = localStorage.getItem('userId');
    this.listStatus = [
      { name: "ACTIVO", value: true },
      { name: "INACTIVO", value: false }
    ];
    this.is_enabled = true;
    this.data = null;
  }
  ngOnInit() {
    
  }
  getCompany() {
    this.http.get('https://www.metcon7.xyz/companies/company/')
      .subscribe(
        (response: any) => {
          this.data = response;
          this.processData(); 
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          // Manejar el error aquí
          console.error(error);
        }
      );
  }
  processData(): void {
    // ...
    if (this.data && Array.isArray(this.data)) {
      this.company = this.data; // Asignar los productos a la variable products
    }
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
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La compañía fue creada con éxito'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
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

  deleteCompany(){
    const userId = localStorage.getItem('userId');
    this.http.delete(`https://www.metcon7.xyz/companies/company/${userId}`)
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio aquí
          console.log(response);
  
          // Mostrar la alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Compañía eliminada con éxito'
          });
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
  modalDelete() {
    $("#modalDeleteCar2").modal("show");
  }
}
