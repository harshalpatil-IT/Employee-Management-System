import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee implements OnInit {

 employee = {
  employee_name: '',
  email: '',
  department: '',
  phone: '',
  status_flag: 'A',
  joining_date: ''
};

employeeId: number = 0;

isEditMode = false;

constructor(
  private employeeService: EmployeeService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {

  this.route.params.subscribe(params => {

    if (params['id']) {

      this.isEditMode = true;

      this.employeeId = +params['id'];

      console.log('Employee ID:', this.employeeId);

      this.loadEmployee();

    }

  });

}
loadEmployee() {

  this.employeeService.getEmployeeById(this.employeeId).subscribe({

    next: (response) => {

      this.employee = response;

      console.log(response);

    },

    error: (error) => {

      console.error(error);

    }

  });

}
saveEmployee() {

  if (this.isEditMode) {

    this.employeeService.updateEmployee(this.employeeId, this.employee)
      .subscribe({

        next: (response: any) => {

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
            timer: 2000,
            showConfirmButton: false
          });

          this.router.navigate(['/app/employees']);

        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Unable to update employee.'
          });

        }

      });

  }
  else {

    this.employeeService.addEmployee(this.employee)
      .subscribe({

        next: (response: any) => {

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
            timer: 2000,
            showConfirmButton: false
          });

          this.router.navigate(['/app/employees']);

        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Unable to add employee.'
          });

        }

      });

  }

}
cancel() {
  this.router.navigate(['/app/employees']);
}
}