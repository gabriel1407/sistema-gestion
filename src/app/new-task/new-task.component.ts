import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

declare var $: any; 

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  data: any;
  data2:any;
  data3: any;
  index:any;
  name:string;
  profileSelected: any = null;
  profileSelectedCompany: any = null;
  proyectList: any[] = [];
  listTrayectos: any[] = [];
  employeList: any[] = [];
  employe: String;
  company:string;
  companyList: any[] = [];
  listStatus: { name: string, value: boolean }[] = [
    { name: "ACTIVO", value: true },
    { name: "INACTIVO", value: false }
  ]
  status: boolean;

  constructor(private location: Location,private http: HttpClient, private router: Router) {
    this.name = '';
    this.status=true;
    this.employe='';
    this.company='';
    this.data = null;
    this.data2=null;
    this.data3=null;
    this.profileSelected='';
    this.profileSelectedCompany='';
  }
  getCompany() {
    this.http.get('https://www.metcon7.xyz/companies/company/')
      .subscribe(
        (response: any) => {
          this.data = response;
          this.processDataCompany(); 
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }
  processDataCompany(): void {
    if (this.data && Array.isArray(this.data)) {
      this.companyList = this.data; 
    }
  }
  getProyect() {
    this.http.get('https://www.metcon7.xyz/task/project_tasks/')
      .subscribe(
        (response: any) => {
          this.data3 = response;
          this.processDataProyect(); 
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }
  processDataProyect(): void {
    if (this.data3 && Array.isArray(this.data3)) {
      this.proyectList = this.data3; 
    }
  }
  getEmploye() {
    this.http.get('https://www.metcon7.xyz/users/users/')
      .subscribe(
        (response: any) => {
          this.data2 = response;
          this.processData(); 
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }
  processData(): void {
    if (this.data2 && Array.isArray(this.data2)) {
      this.employeList = this.data2; 
    }
  }
  selectedPropietario(data: { id: number }): void{
			if(this.employeList!=null && this.employeList.length!=0){
				for(var i=0; i<this.employeList.length;i++){
					if(this.employeList[i]!=null){
						if(this.employeList[i].id==data.id){
							if(this.employeList[i].classSelected==null){
								this.listTrayectos.push(this.employeList[i]);
								this.employeList[i].classSelected="selected";
							}else{
								if(this.listTrayectos.length!=0){
									try{
										for(var j=0;j<this.listTrayectos.length;j++){
											if(this.listTrayectos[j].id==data.id){
													var provi = this.listTrayectos.slice(j + 1);
													this.listTrayectos = this.listTrayectos.slice(0, j);
													this.listTrayectos = this.listTrayectos.concat(provi);
													this.employeList[i].classSelected=null;
											}
										}
									}catch(er){
									}
									
								}
							
							}
						}
					}
				}
			}
	}

  selectedProyect(data: { id: number }): void{
		this.profileSelectedCompany='';
			if(this.proyectList!=null && this.proyectList.length!=0){
				for(var i=0; i<this.proyectList.length;i++){
					if(this.proyectList[i]!=null){
						if(this.proyectList[i].id==data.id){
							if(this.proyectList[i].proyectList==null){
								this.profileSelectedCompany=this.proyectList[i];
								this.proyectList[i].classSelected="selected";
							}else{
								this.proyectList[i].classSelected=null;
							}
						}else{
							this.proyectList[i].classSelected=null;
						}
					}
				}
			}
	}

  postDepartament() {
    const userIds = this.listTrayectos.map(trayecto => trayecto.id);
    const data = {
      name: this.name,
      is_enabled: this.status,
      company: this.profileSelectedCompany.id,
      user: userIds
    };

    this.http.post('https://www.metcon7.xyz/companies/departament/', data)
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio aquí
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El departamento fue creado con éxito'
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
  deleteEmploye(index: number) {
    try {
        var aux = this.listTrayectos[index];
        if (aux != null) {
            for (var i = 0; i < this.employeList.length; i++) {
                if (this.employeList[i] != null) {
                    if (this.employeList[i].id == aux.id) {
                        this.employeList[i].classSelected = null;
                        break;
                    }
                }
            }
        }
        var provi = this.listTrayectos.slice(index + 1);
        this.listTrayectos = this.listTrayectos.slice(0, index);
        this.listTrayectos = this.listTrayectos.concat(provi);
    } catch (er) {
        // Manejo de errores, si es necesario
    }
}
    deleteCompany(){
      this.profileSelectedCompany='';
      if(this.companyList!=null && this.companyList.length!=0){
        for(var i=0;i<this.companyList.length;i++){
          if(this.companyList[i]!=null){
            this.companyList[i].classSelected=null;
          }
        }
      }
}
goBack() {
  this.location.back();
}

}

