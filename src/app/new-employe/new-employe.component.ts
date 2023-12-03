import { Component, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface RegisterResponse {
  status: number;
  access:boolean;
  data: {
    rol: {
      id: string;
    };
    id: string;
  };
}

@Component({
  selector: 'app-new-employe',
  templateUrl: './new-employe.component.html',
  styleUrls: ['./new-employe.component.css']
})
export class NewEmployeComponent {
    showInput: boolean = false;
    listDocs: string[] = ["V", "E", "G", "J"];
    email:string;
    type:string;
    isLoading: boolean = false;
    name:string;
    type_id_doc: string;
    documento: number | null = null;
    last_name:string;
    password:string;
    confirm_password:string;
    phone: number | null;
    username:string;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
      constructor(private http: HttpClient, private elementRef: ElementRef) {
        this.listDocs=["V","E","G","J"];
        this.email = '';
        this.type='Empleado';
        this.name='';
        this.type_id_doc='V'
        this.documento = null;
        this.last_name='';
        this.username='';
        this.password = '';
        this.confirm_password='';
        this.phone=null;
        // this.errorMessage = '';
      }

      back(){
        window.history.back();
      }
      clean(){
        this.email = '';
        this.showInput= false;
        this.type='Empleado';
        this.name='';
        this.documento = null; 
        this.last_name='';
        this.username='';
        this.password = '';
        this.confirm_password='';
        this.phone=null;
      }
  
      // setMask(): void {
      //   jQuery('.phone').mask('(000) 000-0000', {
      //     placeholder: "(000) 000-0000"
      //   });
      // }
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
        const passwordInput = this.elementRef.nativeElement.querySelector('#password');
        passwordInput.type = this.showPassword ? 'text' : 'password';
      }
      allowOnlyNumbers(event: KeyboardEvent): void {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value;
        const numericValue = parseInt(inputValue);
      
        if (isNaN(numericValue)) {
          input.value = '';
        } else {
          input.value = numericValue.toString();
        }
      }
      toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
        const confirmPasswordInput = this.elementRef.nativeElement.querySelector('#confirm_password');
        confirmPasswordInput.type = this.showConfirmPassword ? 'text' : 'password';
      }
      keypressvalidarEmail(event: KeyboardEvent, data: string): void {
        const key = event.keyCode || event.which;
        const tecla = String.fromCharCode(key).toLowerCase();
        const letras = "abcdefghijklmnopqrstuvwxyz0123456789";
        const especiales = [8, 38, 45, 46, 64, 95];
        let tecla_especial = false;
      
        for (const i in especiales) {
          if (key === especiales[i]) {
            if (key === 64) {
              if (data.indexOf(tecla) > -1) {
                tecla_especial = false;
                break;
              }
            }
            if (key === 46) {
              if (data != null) {
                if (data.charAt(data.length - 1) === tecla) {
                  tecla_especial = false;
                  break;
                }
              }
            }
            tecla_especial = true;
            break;
          }
        }
      }
      register() {
        let parametros: { [key: string]: string } = {};
        if (this.email == null || this.email == "" || this.email == undefined || this.email == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Debe ingresar un email',
          });
        } 
         else if (this.name == null || this.name == "" || this.name == undefined || this.name == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Debe ingresar su nombre',
          });
        } else if (this.last_name == null || this.last_name == "" || this.last_name == undefined || this.last_name == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Debe ingresar su apellido',
          });
        } else if (this.password == null || this.password == "" || this.password == undefined || this.password == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Debe ingresar su contraseña',
          });
        } else if (this.confirm_password == null || this.confirm_password == "" || this.confirm_password == undefined || this.confirm_password == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Debe ingresar la confirmación de su contraseña',
          });
        // } else if (this.email !== '' && this.type !== '' && this.name !== '' && this.password !== '' && this.confirm_password !== '') {
        //   this.showInput = true; // Mostrar el input cuando todos los campos estén llenos
        // }
        }else if (this.username == null || this.username == "" || this.username == undefined || this.username == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Debe ingresar su nombre de usuario a utilizar',
          });
        } else {
          if(this.type=='Empleado'){
            this.isLoading = true;
            this.http.post<RegisterResponse>('https://www.metcon7.xyz/users/users/', {
              username: this.username,
              first_name: this.name,
              last_name: this.last_name,
              email: this.email,
              ci: this.documento,
              phone: this.phone,
              password: this.password,
              rol: 2
            }).subscribe(
              (response) => {
                this.isLoading = false;
                // La solicitud se completó con éxito
                Swal.fire({
                  icon: 'success',
                  title: 'Registro exitoso',
                  text: 'Tu cuenta ha sido registrada correctamente.'
                });
                console.log('Registro exitoso:', response);
                // Aquí puedes realizar acciones adicionales después del registro exitoso
              },
              (error: HttpErrorResponse) => {
                // Ocurrió un error durante la solicitud
                Swal.fire({
                  icon: 'error',
                  title: 'Error en el registro',
                  text: 'Hubo un error al registrar tu cuenta. Por favor, intenta nuevamente.'
                });
                console.error('Error en el registro:', error);
                this.isLoading = false;
                // Aquí puedes realizar acciones adicionales después del error de registro
              }
            );
          }
          }
      }
}
