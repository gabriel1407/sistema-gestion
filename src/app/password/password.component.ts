import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  newPassword: string;
  confirmPassword: string;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  username: string; // Variable para almacenar el nombre de usuario
  passwordChanged: boolean | undefined;
  passwordMismatch: boolean | undefined;

  constructor(private location: Location, private http: HttpClient) {
    this.newPassword = '';
    this.confirmPassword = '';
    this.showNewPassword = false;
    this.showConfirmPassword = false;
    this.username = ''; // Inicializar la variable del nombre de usuario

    // Obtener el nombre de usuario del localStorage
    
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goBack() {
    this.location.back();
  }

  changeButtonColor(buttonId: string, color: string) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.style.backgroundColor = color;
    }
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      this.passwordMismatch = true; // Actualiza la variable a true para mostrar el mensaje de error
      return;
    } else {
      this.passwordMismatch = false; // Actualiza la variable a false para ocultar el mensaje de error si estaba visible
    }

    const endpoint = `https://www.metcon7.xyz/companies/change_password/?username=${this.username}`;
    const payload = {
      username: this.username, // Agrega el nombre de usuario al payload
      password: this.newPassword
    };

    this.http.put(endpoint, payload)
      .subscribe(
        (response) => {
          console.log('Contraseña cambiada exitosamente:', response);
          this.passwordChanged = true; // Actualiza la variable a true para mostrar el mensaje de éxito
          // Realiza acciones adicionales después de cambiar la contraseña si es necesario
        },
        (error) => {
          console.error('Error al cambiar la contraseña:', error);
          this.passwordChanged = false; // Actualiza la variable a false para no mostrar el mensaje de éxito
          // Maneja el error de acuerdo a tus necesidades
        }
      );
  }
}