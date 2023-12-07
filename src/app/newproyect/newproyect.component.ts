import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-newproyect',
  templateUrl: './newproyect.component.html',
  styleUrls: ['./newproyect.component.css']
})
export class NewproyectComponent {
  employe: String;
  data: any;
  proyectList: any[] = [];

  constructor(private http: HttpClient, private elementRef: ElementRef) {
    this.employe='';
    this.data = null;
   }
   ngOnInit() {
 
   }
   getProyect() {
     this.http.get('https://www.metcon7.xyz/task/project_tasks/')
       .subscribe(
         (response: any) => {
           this.data = response;
           this.processData(); 
         },
         (error: HttpErrorResponse) => {
           console.error(error);
         }
       );
   }
   processData(): void {
     if (this.data && Array.isArray(this.data)) {
       this.proyectList = this.data; 
     }
   }
   deleteProyect() {
    if (this.proyectList) {
      const endpoint = `https://www.metcon7.xyz/task/project_tasks/${this.proyectList[0].id}/`;
      this.http.delete(endpoint).subscribe(
        () => {
          console.log('Tarea eliminada');
          const index = this.proyectList.findIndex((t) => t.id === this.proyectList[0].id);
          if (index !== -1) {
            this.proyectList.splice(index, 1);
            $("#modalDeleteCar2").modal("hide");
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'La tarea se ha eliminado exitosamente.',
            });
          }
          this.proyectList = [];
        },
        (error) => {
          console.error('Error al eliminar la tarea:', error);
        }
      );
    }
  }
   modal() {
     $("#modalDeleteCar2").modal("show");
   }
}