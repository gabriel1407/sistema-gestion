import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  username: string;
  passwordChanged: boolean | undefined;
  passwordMismatch: boolean | undefined;

  constructor(private location: Location, private http: HttpClient, private router: Router) {
    this.newPassword = '';
    this.confirmPassword = '';
    this.showNewPassword = false;
    this.showConfirmPassword = false;
    this.username = '';
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

  onUsernameInput(event: any) {
    this.username = event.target.value;
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
    }

    const endpoint = `https://www.metcon7.xyz/companies/change_password/?username=${this.username}`;
    const payload = {
      username: this.username,
      password: this.newPassword
    };

    this.http.put(endpoint, payload)
      .subscribe(
        (response) => {
          console.log('Contraseña cambiada exitosamente:', response);
          this.passwordChanged = true;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); // Retraso de 3 segundos antes de redirigir al login
        },
        (error) => {
          console.error('Error al cambiar la contraseña:', error);
          this.passwordChanged = false;
        }
      );
  }
}