import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

declare var $: any; 

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css']
})
export class DepartamentComponent implements OnInit {
  employe: String;
  data: any;
  employeList: any[] = [];

  constructor(private http: HttpClient, private elementRef: ElementRef) {
   this.employe='';
   this.data = null;
  }
  ngOnInit() {
    this.getEmploye();
  }
  getEmploye() {
    this.http.get('https://www.metcon7.xyz/companies/company/')
      .subscribe(
        (response: any) => {
          this.data = response;
          this.processData(); 
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }
  processData(): void {
    if (this.data && Array.isArray(this.data)) {
      this.employeList = this.data; 
    }
  }

  modal() {
    $("#modalDeleteCar").modal("show");
  }
}
