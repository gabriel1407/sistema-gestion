import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

declare var $: any; // Declaración de la variable $ como global

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css']
})
export class DepartamentComponent {
  
  constructor(private http: HttpClient, private elementRef: ElementRef) {}

  modal() {
    $("#modalDeleteCar").modal("show");
  }
}
