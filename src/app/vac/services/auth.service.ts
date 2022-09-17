import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtResponse } from '../auth/jwt-response';
import { AuthLoginInfo } from '../auth/login-info';
import { User } from '../models/user';
import { TokenStorageService } from '../auth/token-storage.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8080';
  //apiUrl = 'http://111.223.53.119:8080';

  user: User;

  constructor(
    private httpClient: HttpClient,
    private tokenStored: TokenStorageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  // authenticate(credentials: AuthLoginInfo): Observable<JwtResponse> {
  //   return this.httpClient.post<JwtResponse>('http://localhost:8003/authenticate', credentials, httpOptions);
  //   // return this.httpClient.post<JwtResponse>('/authenticate', credentials, httpOptions);
  // }

  authenticate(credentials: AuthLoginInfo): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + '/authenticate', credentials, httpOptions);
    // return this.httpClient.post<JwtResponse>('/authenticate', credentials, httpOptions);
  }

  login(credentials: AuthLoginInfo) {
    //alert('logged In');
    //const authData: Auth = { username: id, password: password };

    this.user = new User;
    this.user.userId = credentials.username;
    this.user.password = credentials.password;

    this.httpClient
      .post(
        this.apiUrl + '/authenticate',
        credentials
      )
      .subscribe(
        (data: User) => {
            // console.log("POST call successful value returned in body", 
            //             data);
            this.user = data;
            //this.token = this.user.token;
            //this.isAuthenticated = true;
            this.tokenStored.saveToken(this.user.token);
            this.tokenStored.saveUserid(this.user.userId);
            this.tokenStored.saveUsername(this.user.userFname);
            //let userProfile = JSON.stringify(data.userProfile);
            // console.log(userProfile);
            //this.tokenStored.saveUserProfile(userProfile);
            //this.invalidLogin = true;
            //this.modalService.dismissAll();
            //this.messageEvent.emit(JSON.stringify(status));
          },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
            //this.router.navigate(['/']);
          });
    }

  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem('username')
    }
  }
}