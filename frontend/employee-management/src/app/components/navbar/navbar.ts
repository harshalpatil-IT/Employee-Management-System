import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  fullName = '';

  constructor(private router: Router) {}

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.fullName = user.fullName || user.full_name || 'Admin';

  }

  logout() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

}