import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const loginData = {
      username: this.username,
      password: this.password
    };
console.log("Sending Data:", loginData);
    this.authService.login(loginData).subscribe({
next: (response) => {

  // Save JWT Token
  localStorage.setItem('token', response.token);

  // Save Logged-in User
  localStorage.setItem(
    'user',
    JSON.stringify(response.user)
  );

  alert(response.message);

  this.router.navigate(['/app/dashboard']);

},
      error: (error) => {

        alert(error.error.message);

      }

    });

  }

}