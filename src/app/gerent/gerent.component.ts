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

  constructor(private http: HttpClient, private router: Router, private elementRef: ElementRef) {
    
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
}
