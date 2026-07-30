import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://employee-management-api-nol1.onrender.com/employees';

  // private apiUrl = 'http://localhost:5000/employees';

  constructor(private http: HttpClient) {}

  // GET Employees
getEmployees(
  page: number = 1,
  limit: number = 5,
  search: string = '',
  department: string = ''
) {
  return this.http.get<any>(
    `${this.apiUrl}?page=${page}&limit=${limit}&search=${search}&department=${department}`
  );
}
  getEmployeeById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

  // POST Employee
  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
}

deleteEmployee(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}

exportAllEmployees(search: string = '', department: string = '') {

  return this.http.get<any[]>(

    `${this.apiUrl}/export`,

    {
      params: {
        search,
        department
      }
    }

  );

}
}