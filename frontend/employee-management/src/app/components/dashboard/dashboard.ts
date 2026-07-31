import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard';
import { DashboardCard } from '../dashboard-card/dashboard-card';
import { ActionCard } from '../action-card/action-card';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule,
  DashboardCard,
  ActionCard
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalEmployees = 0;
  activeEmployees = 0;
  inactiveEmployees = 0;
fullName = '';
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

  this.fullName = user.fullName || user.full_name;

  this.loadDashboard();

  }

  loadDashboard() {

    this.dashboardService.getDashboardData().subscribe({

      next: (response) => {

        console.log(response);

        this.totalEmployees = response.totalEmployees;

        this.activeEmployees = response.activeEmployees;

        this.inactiveEmployees = response.inactiveEmployees;

      },

      error: (error) => {

        console.log(error);

      }

    });

  }
manageEmployees() {

  this.router.navigate(['/app/employees']);

}

addEmployee() {

  this.router.navigate(['/app/add-employee']);

}
 

  logout() {

    this.router.navigate(['/']);

  }

}