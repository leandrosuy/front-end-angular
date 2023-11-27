import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000/users';
  private authToken =
    'd0eb813d3b393c338e074a17f627d3377df3514db31869cbf2481cb0290f60b3';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.post<User>(this.baseUrl, user, { headers });
  }

  read(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<User[]>(this.baseUrl, { headers });
  }

  readById(id: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url, { headers });
  }

  update(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    const url = `${this.baseUrl}/${user.id}`;
    return this.http.put<User>(url, user, { headers });
  }

  delete(id: number): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url, { headers });
  }
}
