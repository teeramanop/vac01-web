import { Injectable,ViewChild,Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { ListBoxMaster } from '../share-class/ListBoxMaster';
import { UserProfile }  from '../share-class/UserProfile';
import { ZipCode } from '../share-class/ZipCode';
import { catchError,tap } from 'rxjs/operators';
import { ContentModel } from '../share-class/ContentModel';
import { TokenStorageService } from '../auth/token-storage.service';
const httpOptions = {
};
@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements OnInit{
  constructor(
    private httpClient:HttpClient,
    private tokenStored: TokenStorageService, 
  ) { }

  handleError(error: HttpErrorResponse) {

    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.log(error.status);
      if(error.status == 401){        
        // console.log("test");
      }
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  ngOnInit() {
  }

  productionMode : boolean = false;


  


  resetPassword(param) {
  }
  // saveRejectReason(param):Observable<any>
  // {
  //   if(this.productionMode)
  //     return this.httpClient.post<any>('/CommonController/saveRejectReason',param ,httpOptions).pipe(catchError(this.handleError));
  //   else
  //     return this.httpClient.post<any>('http://localhost:8003/CommonController/saveRejectReason',param ,httpOptions).pipe(catchError(this.handleError));
  // }
  // getUserProfileByUsername(param) : Observable<any>
  // {
  //      if(this.productionMode)
  //     return this.httpClient.post<any>('/UserProfileController/getUserProfileByUsername?username='+param ,httpOptions).pipe(catchError(this.handleError));
  //   else
  //     return this.httpClient.post<any>('http://localhost:8003/UserProfileController/getUserProfileByUsername?username='+param ,httpOptions).pipe(catchError(this.handleError));
  // }

  uploadProfileImage(fileToUpload: File, userId): Observable<boolean> {
    if(this.productionMode){
      const endpoint = '/FileController/uploadFileProfileImage'; 
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      formData.append('userID',userId);
      return this.httpClient.post<any>(endpoint, formData, httpOptions)
    }else{  
      const endpoint = 'http://localhost:8003/FileController/uploadFileProfileImage'; 
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      formData.append('userID',userId);
      return this.httpClient.post<any>(endpoint, formData, httpOptions).pipe(catchError(this.handleError));
    }
  }
  
}