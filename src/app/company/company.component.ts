import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

declare var $: any; // Declaración de la variable $ como global
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  constructor(private http: HttpClient, private elementRef: ElementRef) {}
  modal() {
    $("#modalDeleteCar").modal("show");
  }
}
