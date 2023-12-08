import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any; // Declaración de la variable $ como global
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  imagen_src:string;
  dataShow: string;

  constructor(private http: HttpClient, private router: Router, private elementRef: ElementRef) {
    this.imagen_src="assets/images/loading.gif";
    this.dataShow = 'Cargando...';
  }
  showPleaseWait(){
    $("#pleaseWaitDialog").modal('show');
  }
  hidePleaseWait(){
    $("#pleaseWaitDialog").modal('hide');
  }
}
