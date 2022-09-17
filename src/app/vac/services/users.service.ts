import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { AuthService } from './auth.service';
import { TokenStorageService } from '../auth/token-storage.service';

import { Menuitem } from '../models/menuitem';
import { User } from '../models/user';
import { Role } from '../models/role';
import { catchError, map} from 'rxjs/operators';
import { throwError, concat, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
    menuitem: Menuitem[];
    users: User[];
    roles: Role[];
    user: User;

    constructor(private http: HttpClient,private authService: AuthService
      ,private tokenStored: TokenStorageService) {}

  getMenu() {
    //console.log('Get menu')
    return this.http
    .get<Menuitem[]>(
      this.authService.apiUrl + '/user/usermenu/?userid='+this.tokenStored.getUserid())
  }

  // getRecord(userid: String) {
  //   //console.log('Get record')
  //   return this.http
  //   .get<User>(
  //     this.authService.apiUrl + '/user/getrecord/?userid='+userid);
  // };
  
  getRecord(userid: String) {
    //console.log('Get record')
    return this.http
    .post<User>(
      this.authService.apiUrl + '/user/select',userid);
  };


  getRecordsById(userid: string) {

    return this.http
    .post<User[]>(
      this.authService.apiUrl + '/user/selectbyuserid',userid);
  }

  getRecordsByName(username: string) {

    return this.http
    .post<User[]>(
      this.authService.apiUrl + '/user/selectbyusername',username);
  }

  createNew(user: User) {
    // console.log('Create')
    return this.http
    .post<User>(
      this.authService.apiUrl + '/user/add',user
    );
  };

  saveUpdate(user: User) {
    // console.log('Update');
    return this.http
    .post<User>(
      this.authService.apiUrl + '/user/update',user
    );
  };

  deleteRecord(user: User) {
    // console.log('Delete')
    return this.http
    .post<User>(
      this.authService.apiUrl + '/user/delete',user
    );
  }

  getUserRoles(userid: string) {

    return this.http
    .post<[]>(
      this.authService.apiUrl + '/user/userroles',userid);
  }


  getAllRoles() {
    return this.http
    .get<[]>(
      this.authService.apiUrl + '/user/allroles');
  }

  updateRoles(userid: string,roles: Role[]) {
    return this.http
    .post<[]>(
      this.authService.apiUrl + '/user/updateroles/?userid=' + userid,roles);
  }

  report(userid: string) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http
    .get<any>(
      this.authService.apiUrl + '/user/report?userid=' + userid, httpOptions);
  }


}
