import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://employee-management-api-nol1.onrender.com/auth/login';

    // private apiUrl = 'http://localhost:5000/auth/login';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

}