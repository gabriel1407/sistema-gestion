import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-proyect-gerent',
  templateUrl: './new-proyect-gerent.component.html',
  styleUrls: ['./new-proyect-gerent.component.css']
})
export class NewProyectGerentComponent {
  data: any;
  data2:any;
  index:any;
  name:string;
  profileSelected: any = null;
  profileSelectedCompany: any = null;
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
    this.profileSelected='';
    this.profileSelectedCompany='';
  }
  getCompany() {
    this.http.get('https://www.metcon7.xyz/users/user_admin/')
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

  getEmploye() {
    this.http.get('https://www.metcon7.xyz/companies/departament/')
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
  selectedDepartament(data: { id: number }): void{
		this.profileSelected='';
			if(this.employeList!=null && this.employeList.length!=0){
				for(var i=0; i<this.employeList.length;i++){
					if(this.employeList[i]!=null){
						if(this.employeList[i].id==data.id){
							if(this.employeList[i].employeList==null){
								this.profileSelected=this.employeList[i];
								this.employeList[i].classSelected="selected";
							}else{
								this.employeList[i].classSelected=null;
							}
						}else{
							this.employeList[i].classSelected=null;
						}
					}
				}
			}
	}
  selectedCompany(data: { id: number }): void{
		this.profileSelectedCompany='';
			if(this.companyList!=null && this.companyList.length!=0){
				for(var i=0; i<this.companyList.length;i++){
					if(this.companyList[i]!=null){
						if(this.companyList[i].id==data.id){
							if(this.companyList[i].companyList==null){
								this.profileSelectedCompany=this.companyList[i];
								this.companyList[i].classSelected="selected";
							}else{
								this.companyList[i].classSelected=null;
							}
						}else{
							this.companyList[i].classSelected=null;
						}
					}
				}
			}
	}

  postDepartament() {
    const data = {
      name: this.name,
      is_enabled: this.status,
      departament: this.profileSelected.id,
      owner: this.profileSelectedCompany.id
    };

    this.http.post('https://www.metcon7.xyz/task/project_tasks/', data)
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio aquí
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El proyecto fue creado con éxito'
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
deleteDepartament(){
  this.profileSelected='';
  if(this.employeList!=null && this.employeList.length!=0){
    for(var i=0;i<this.employeList.length;i++){
      if(this.employeList[i]!=null){
        this.employeList[i].classSelected=null;
      }
    }
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
