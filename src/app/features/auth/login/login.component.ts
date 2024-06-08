import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  model: LoginRequest;
  errorMessage: string;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
    this.model = {
      email: '',
      password: ''
    }

    this.errorMessage = '';
  }
  ngOnInit(): void {
  }


  onFormSubmit(): void{
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {

         // Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

           // Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

          // Redirect back to Home
        this.router.navigateByUrl('/');
        },
      error: (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'Invalid email or password. Please try again.'; // Example error message
        // Handle error here (e.g., display error message to user)
      }
      });
  }
}
