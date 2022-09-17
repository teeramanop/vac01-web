import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { AuthService } from './auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Branch } from '../models/branch';

@Injectable({
    providedIn: 'root'
  })

  export class BranchService {
    constructor(private http: HttpClient,private authService: AuthService) {}

    getRecord(branch: Branch) {
        //console.log('Get record')
        return this.http
        .post<Branch>(
        this.authService.apiUrl + '/branch/select',branch);
    };

    createNew(branch: Branch) {
        //console.log('Create')
        return this.http
        .post<Branch>(
          this.authService.apiUrl + '/branch/add',branch
        );
    };

    saveUpdate(branch: Branch) {
        //console.log('Update');
        return this.http
        .post<Branch>(
          this.authService.apiUrl + '/branch/update',branch
        );
    };
    
    deleteRecord(branch: Branch) {
      //console.log('Update');
      return this.http
      .post<Branch>(
        this.authService.apiUrl + '/branch/delete',branch
      );
    };

    getByCompCode(compcode: string) {
        return this.http
        .get<Branch[]>(
          this.authService.apiUrl + '/branch/selectbycompcode'+'?compcode=' + compcode);
    };
    
    // getByBranchCode(compcode: string, branchcode: string){
    //     return this.http
    //     .get<Branch[]>(
    //     this.authService.apiUrl + '/branch/selectbybranch'+'?compcode=' + compcode+'&branchcode=' + branchcode);
    // };

    getNotBranchCode(compcode: string, branchcode: string){
      return this.http
      .get<Branch[]>(
      this.authService.apiUrl + '/branch/getnotbranchcode'+'?compcode=' + compcode+'&branchcode=' + branchcode);
    };
    
    getByBranchCode(compcode: string, branchcode: string){
        return this.http
        .get<Branch>(
        this.authService.apiUrl + '/branch/getbybranchcode'+'?compcode=' + compcode+'&branchcode=' + branchcode);
    };

  }
