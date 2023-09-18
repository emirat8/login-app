import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL: string = "https://fakestoreapi.com/auth/login";
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(user);
    const resp = this.http.post<any>(this.baseURL, body, {headers});

    return resp;
  }
}