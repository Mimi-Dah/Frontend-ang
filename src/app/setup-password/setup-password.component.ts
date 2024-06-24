import { Component } from '@angular/core';
import { DocumentService } from '../document.service';
import { HttpClient } from '@angular/common/http';
import { url } from '../base/base_url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})
export class SetupPasswordComponent {
  roles: any[] = ['Fournisseur','Autorite','Admin']; 
  selectedRole: number |null =null;
  password: string = '';
  loginInProgress = false;
  constructor(
    private apiService:DocumentService,
    private http: HttpClient
    ,private router: Router) { }

    onPasswordChange(newPassword: string) {
      // Update the password value when it changes
      this.password = newPassword;
    }
    onSave() {
      // Appel de l'API pour enregistrer le mot de passe et le rôle
      this.loginInProgress = true;
      const user = {
        username: localStorage.getItem('usernom'),
        nom_autorite: localStorage.getItem('nom_autorite'),
        contact: localStorage.getItem('userphone'),
        email: localStorage.getItem('email'),
        adresse_autorite: localStorage.getItem('adresse_autorite'),
        password: this.password,
        role: this.selectedRole,
      };
      console.log(user);
      // Remplacez l'URL par l'URL réelle de votre API
      this.http.post(`${url}register/`, user)
        .subscribe(
          (response) => {
            console.log('Enregistrement réussi:', response);
            // Vous pouvez également stocker les autres informations dans le localStorage ici si nécessaire
            
            this.router.navigate(['/login']);
          },
          (error) => {
            this.loginInProgress = false;
            console.error('Erreur lors de l\'enregistrement:', error);
          }
        );
    }
}
