import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee',
  standalone: true,
 imports: [
    CommonModule,
    FormsModule,
    RouterModule
],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit {

employees: any[] = [];

currentPage = 1;
pageSize = 5;
totalRecords = 0;
totalPages = 0;

filteredEmployees: any[] = [];

searchText = '';
selectedDepartment = '';
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {

    this.loadEmployees();

  }

loadEmployees() {

  this.employeeService
      .getEmployees(
        this.currentPage,
        this.pageSize,
        this.searchText,
        this.selectedDepartment
      )
      .subscribe({

        next: (response: any) => {

          this.employees = response.employees;
          this.filteredEmployees = response.employees;

          this.totalRecords = response.total;
          this.totalPages = response.totalPages;

        },

        error: (error) => {

          console.error(error);

        }

      });

}
previousPage() {

  if (this.currentPage > 1) {

    this.currentPage--;

    this.loadEmployees();

  }

}

nextPage() {

  if (this.currentPage < this.totalPages) {

    this.currentPage++;

    this.loadEmployees();

  }

}
getPages(): number[] {

  return Array.from(
    { length: this.totalPages },
    (_, index) => index + 1
  );

}
goToPage(page: number) {

  this.currentPage = page;

  this.loadEmployees();

}
filterEmployees() {

  this.currentPage = 1;

  this.loadEmployees();

}
deleteEmployee(id: number) {

  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this employee?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      this.employeeService.deleteEmployee(id)
        .subscribe({

          next: (response: any) => {

            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: response.message,
              timer: 2000,
              showConfirmButton: false
            });

            this.loadEmployees();

          },

          error: () => {

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Unable to delete employee.'
            });

          }

        });

    }

  });

}

exportToExcel(): void {

  this.employeeService
      .exportAllEmployees(
        this.searchText,
        this.selectedDepartment
      )
      .subscribe({

        next: (employees: any[]) => {

          const worksheet: XLSX.WorkSheet =
            XLSX.utils.json_to_sheet(

              employees.map(employee => ({

                ID: employee.employee_id,

                Name: employee.employee_name,

                Email: employee.email,

                Department: employee.department,

                Phone: employee.phone,

                Status:
                  employee.status_flag === 'A'
                    ? 'Active'
                    : 'Inactive'

              }))

            );

          const workbook: XLSX.WorkBook = {

            Sheets: {

              Employees: worksheet

            },

            SheetNames: ['Employees']

          };

          const excelBuffer = XLSX.write(

            workbook,

            {

              bookType: 'xlsx',

              type: 'array'

            }

          );

          const blob = new Blob(

            [excelBuffer],

            {

              type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

            }

          );

          FileSaver.saveAs(

            blob,

            'Employees.xlsx'

          );

        },

        error: (error) => {

          console.error(error);

          Swal.fire({

            icon: 'error',

            title: 'Export Failed',

            text: 'Unable to export employees.'

          });

        }

      });

}

exportToPDF(): void {

  this.employeeService
      .exportAllEmployees(
        this.searchText,
        this.selectedDepartment
      )
      .subscribe({

        next: (employees: any[]) => {

          const doc = new jsPDF();

          doc.setFontSize(18);
          doc.text('Employee Management Report', 14, 20);

          doc.setFontSize(11);
          doc.text(
            `Generated On: ${new Date().toLocaleString()}`,
            14,
            30
          );

          doc.text(
            `Total Employees: ${employees.length}`,
            14,
            38
          );

          autoTable(doc, {

            startY: 48,

            head: [[
              'ID',
              'Name',
              'Email',
              'Department',
              'Phone',
              'Status'
            ]],

            body: employees.map(employee => [

              employee.employee_id,

              employee.employee_name,

              employee.email,

              employee.department,

              employee.phone,

              employee.status_flag === 'A'
                ? 'Active'
                : 'Inactive'

            ])

          });

          doc.save('Employees_Report.pdf');

        },

        error: () => {

          Swal.fire({

            icon: 'error',

            title: 'Export Failed',

            text: 'Unable to generate PDF.'

          });

        }

      });

}

}