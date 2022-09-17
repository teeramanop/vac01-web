import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  constructor(private http: HttpClient,private authService: AuthService) {}
  getRecord(company: Company) {
      //console.log('Get record')
      return this.http
      .post<Company>(
      this.authService.apiUrl + '/company/select',company);
  };
  saveUpdate(company: Company) {
      //console.log('Update');
      return this.http
      .post<Company>(
        this.authService.apiUrl + '/company/update',company
      );
  };
  getData(){
    return this.http
    .get<Company[]>(
    this.authService.apiUrl + '/company/searchall');
  };
  createNew(company: Company) {
    //console.log('Create')
    return this.http
    .post<Company>(
      this.authService.apiUrl + '/company/add',company
    );
  };
  deleteRecord(company: Company) {
    //console.log('Update');
    return this.http
    .post<Company>(
      this.authService.apiUrl + '/company/delete',company
    );
  };
  getByCompCode(compcode: string) {
    return this.http
    .get<Company[]>(
      this.authService.apiUrl + '/company/searchbycompcode'+'?compcode=' + compcode);
  };
  getByCompName(compname: string) {
    return this.http
    .get<Company[]>(
      this.authService.apiUrl + '/company/searchbycompname'+'?compname=' + compname);
  };
}