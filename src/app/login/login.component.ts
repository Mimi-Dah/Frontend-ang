import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login_model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginInProgress = false;
  hide = true; 
  isCorrect: boolean = false;
  credentials = { username: '', password: '' };
  message: string | undefined;
  token: string | null | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;

  constructor(private _snackBar: MatSnackBar,private apiService: AuthService, private router: Router) {

    
  }
  login() {
     this.loginInProgress = true; 
     this.apiService.login(this.credentials).subscribe(
      (response: LoginResponse) => {
        if (response.status === 200) {
          // Login success
          this.message = response.message;
          // Store the access token in local storage or a cookie
          if(response.role==='Admin'){  
            localStorage.setItem('access', response.access);  
            this.token = localStorage.getItem('access');
            this.router.navigate(['/home-admin']);
            localStorage.setItem('role',response.role);
          }
          else if(response.role==='Fournisseur')
          {
           // Redirect to the home manager page

           localStorage.setItem('access', response.access);
           this.token = localStorage.getItem('access');
           localStorage.setItem('role',response.role);
           this.router.navigate(['/home-agent']);
          //  this.router.navigate(['/home-agent']);
        }
          else if(response.role==='Autorite')
           {
            // Redirect to the home manager page
              localStorage.setItem('access', response.access);  
              this.token = localStorage.getItem('access');
              localStorage.setItem('role',response.role);
              this.router.navigate(['/home-gerant']);
            }
          else 
          {
            // Handle the case where response.access is undefined
            console.error('Access token is undefined.');
            
          }
        }
        else
        {
          this.message = response.message;
          this.showErrorMessage = true;
          if (this.message) {
            this.showErrorAlert(this.message);
          }

        }
      },
      (error) => {
        // Login error
        this.message = 'Informations invalides';
      }
    ).add(() => {
      this.loginInProgress = false; // Set to false after login completes (whether success or error)
    });
  }
  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 8000, // Durée d'affichage de l'alerte (8 secondes)
    });
  }
  removeToken() {
    this.token = null;
  }

  logout() {
    // Appel de la méthode de déconnexion du service d'authentification
    this.removeToken();
    // Redirigez l'utilisateur vers la page de connexion ou toute autre page appropriée après la déconnexion.
    // Vous pouvez utiliser le routeur Angular pour cela.
  }
}
