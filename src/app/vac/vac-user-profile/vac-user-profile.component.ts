import { Component, ElementRef,OnInit, ViewChild, EventEmitter } from '@angular/core';
import { VacModalLoginComponent } from '../vac-modal-login/vac-modal-login.component'
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClientService } from '../services/httpclient.service'; 
import { ListBoxMaster } from '../share-class/ListBoxMaster';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService} from '@ngx-translate/core';

import { UsersService } from '../services/users.service';
import { User } from '../models/user';


const URL_FILE_UPLOAD = "http://xxxxxxxxx/FileService/uploadFile";
declare var EXIF: any;
@Component({
  selector: 'app-vac-user-profile',
  templateUrl: './vac-user-profile.component.html',
  styleUrls: ['./vac-user-profile.component.scss']
})
export class VacUserProfileComponent implements OnInit {
  LANGUAGE : any = {}
  fileToUpload: File = null;
  imgProfile: string = null; 
  sizeFile : number = 1048576;
  dialogSuccessMessage : string = this.LANGUAGE.msgSaved; 
  SetAutoCompleteOff:string = 'new-password';

  hide2= true;
  hide1= true;
  hide= true;

  user: User;

  // Form data
  userId: string = '';
  userFname: string = '';
  userLname: string = '';
  email: string = '';
  phone1: string = '';
  phone2: string = '';

  userIdErrorMsg: string = '';
  userFnameErrorMsg: string = '';
  userLnameErrorMsg: string = '';
  emailErrorMsg: string = '';
  phone1ErrorMsg: string = '';
  phone2ErrorMsg: string = '';


  oldPassword: string = '';
  password: string = '';
  confirmPassword: string = '';

  passwordErrorMsg: string = '';
  confirmPasswordErrorMsg: string = '';

  
  changePassErrorMsg: string = '';
  confirmPasswordClassMsg: string = '';
  errorMessage : string = '';
  passwordValidate : boolean = true;

  // ----------
  
  @ViewChild('confirmPasswordModal',{static: false}) confirmPasswordModal;
  @ViewChild('dialogSuccess',{static: false}) dialogSuccess;
  @ViewChild('img',{static:false}) imgEl: ElementRef;

  constructor(
    private tokenStored: TokenStorageService,
    private httpClienService: HttpClientService,
    private service : HttpClientService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private modalRefService: NgbActiveModal,
    private usersService: UsersService,
    ) {
      translate.addLangs(['th','en']);
      translate.reloadLang((this.tokenStored.getLanguage() || 'th')).toPromise().then(result => {
          this.LANGUAGE = result;
       });
     }
    
  

  ngOnInit() {
    this.getUser(this.tokenStored.getUserid().toString());
  }

  getUser(userid: String) {
    this.usersService.getRecord(userid).subscribe((res)=>{
      this.user = res;
      if (this.user.respMsg=="Completed") {
        this.userId = this.user.userId;
        this.userFname = this.user.userFname;
        this.userLname = this.user.userLname;
        this.password = this.user.password;
        this.email = this.user.email;
        this.phone1 = this.user.phone1;
        this.phone2 = this.user.phone2;
      } 
      });
  }

  saveUpdate() {
    if (this.userFname=='') {
      this.userFnameErrorMsg = 'Required'
      return;
    }
    if (this.userLname=='') {
      this.userLnameErrorMsg = 'Required'
      return;
    }

    this.userFnameErrorMsg = ''; 
    this.userLnameErrorMsg = '';

    this.user.userId = this.userId;
    this.user.userFname = this.userFname;
    this.user.userLname = this.userLname;
    //this.user.password = this.password;
    this.user.email = this.email;
    this.user.phone1 = this.phone1;
    this.user.phone2 = this.phone2;

    this.usersService.saveUpdate(this.user).subscribe((res)=>{
      //console.log("Res=" + res);
      this.user = res;
    });
    alert('saved');
  }



  onValidatePassword(value){
  }

  updateUserProfilePassword(){
      if(this.password != '' && this.confirmPassword != ''){
        if(this.password == this.confirmPassword){
          this.savePassword();
        }else{
           this.changePassErrorMsg  = 'กรุณากรอกรหัสผ่านให้เหมือนกัน'
        }
      }else{
        if (this.password=='') {
          this.passwordErrorMsg = 'Required'
          return;
        }
        if (this.confirmPassword=='') {
          this.confirmPasswordErrorMsg = 'Required'
          return;
        }
      }
  }

  savePassword() {
    if (this.password=='') {
      this.passwordErrorMsg = 'Required'
      return;
    }
    if (this.confirmPassword=='') {
      this.confirmPasswordErrorMsg = 'Required'
      return;
    }

    this.passwordErrorMsg = ''; 
    this.confirmPasswordErrorMsg = '';

    this.user.userId = this.userId;
    this.user.userFname = this.userFname;
    this.user.userLname = this.userLname;
    this.user.password = this.password;
    this.user.email = this.email;
    this.user.phone1 = this.phone1;
    this.user.phone2 = this.phone2;

    this.usersService.saveUpdate(this.user).subscribe((res)=>{
      //console.log("Res=" + res);
      this.user = res;
      this.closeConfirmPasswordModal();
    });

  }

  openModalChangePassword(){
    this.confirmPassword = '';
    this.password = '';
    this.oldPassword = '';
    this.modalService.open(this.confirmPasswordModal,{backdrop:'static'});
  }
  closeConfirmPasswordModal(){
      this.confirmPassword = '';
      this.oldPassword = '';
      this.password = '';
      this.dialogSuccessMessage = '';
      this.modalService.dismissAll();
  }

  closeModal(){
    this.dialogSuccessMessage = '';
    this.modalService.dismissAll();
  }
  openModal(){
    this.modalService.open(this.dialogSuccess,{backdrop : 'static'});
  }

  handleFileInput(files: FileList) {
    // console.log('handleFileInput');
    this.fileToUpload = files.item(0);
      if(this.fileToUpload.type == "image/png" || this.fileToUpload.type == "image/jpeg"){
          this.uploadFileToActivity(); 
      }else{
       this.dialogSuccessMessage = this.LANGUAGE.supportPicture;
       this.modalService.open(this.dialogSuccess,{backdrop : 'static'});
      }
  }

  uploadFileToActivity() {
    this.service.uploadProfileImage(this.fileToUpload, this.userId).subscribe(data => {
      // console.log(data);
      this.imgProfile = data['fileDownloadUri'];
      //this.getUserProfileByUserName(this.tokenStored.getUsername());
      }, error => {
        console.log(error);
      });
  }
  

  clearFile(){
    this.fileToUpload = null;
  }
  numberOnly(event): boolean {
    var vchar = String.fromCharCode((event.which) ? event.which : event.keyCode);
    if ((vchar<'0' || vchar>'9')){
      return false;
    }
    return true;

  }
  
}
