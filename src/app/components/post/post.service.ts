import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { Post } from './post.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'http://localhost:3000/users';
  baseUrlPosts = 'http://localhost:3000/posts';
  private authToken =
    'd0eb813d3b393c338e074a17f627d3377df3514db31869cbf2481cb0290f60b3';
  constructor(private snackBar: MatSnackBar, private http: HttpClient ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  read(): Observable<Post[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<Post[]>(this.baseUrlPosts, { headers });
  }

  create(post: Post): Observable<Post> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.post<Post>(this.baseUrlPosts, post, {headers})
  }

  readById(id: string): Observable<Post> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    const url = `${this.baseUrlPosts}/${id}`;
    return this.http.get<Post>(url, { headers });
  }

  update(post: Post): Observable<Post> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    const url = `${this.baseUrlPosts}/${post.id}`;
    return this.http.put<Post>(url, post, { headers });
  }

  delete(id: number): Observable<Post> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    const url = `${this.baseUrlPosts}/${id}`;
    return this.http.delete<Post>(url, { headers });
  }
}
