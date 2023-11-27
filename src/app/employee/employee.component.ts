import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

declare var $: any; // Declaración de la variable $ como global

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  constructor(private http: HttpClient, private elementRef: ElementRef) {}
  modal() {
    $("#modalDeleteCar").modal("show");
  }
}
