import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
 
   modal() {
     $("#modalDeleteCar").modal("show");
   }
}