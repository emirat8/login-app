import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login';

  loginResp: any = ""
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
  }
  
  onLogin(): void {
    const user = {
      username: this.username,
      password: this.password
    }
    this.loginService.login(user).pipe(catchError(this.handleError))
    .subscribe((resp: any) => {
      console.log(resp);
      this.loginResp = resp;
    })
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}