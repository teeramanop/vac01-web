import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClientService } from '../services/httpclient.service';
import { AuthLoginInfo } from '../auth/login-info';
import { TranslateService} from '@ngx-translate/core';
import { User } from '../models/user';


@Component({
  selector: 'app-vac-modal-login',
  templateUrl: './vac-modal-login.component.html',
  styleUrls: ['./vac-modal-login.component.scss'],
})
export class VacModalLoginComponent implements OnInit {
  @ViewChild('loginModal',{static: false}) loginModal;
  @ViewChild('modelRejectReserve',{static: false}) modelRejectReserve;
  @ViewChild('dialogSuccess',{static: false}) dialogSuccess;
  @ViewChild('registerModal',{static: false}) registerModal;
  @Output() messageEvent = new EventEmitter<any>();
  @Output() messageEventCheck = new EventEmitter<any>();
  hide = true;
  hide1 = true
  LANGUAGE : any = {}

  passwordValidate : boolean = false;
  form: any = {};
  username: string = '';
  password: string = '';
  emailForget : string = '';
  createProfile: any =  {password : '',passwordConfirm : '',email : '',userName : '' , firstName : '', lastName : '',tel_1:''};
  invalidLogin: boolean = (this.tokenStored.getUsername() == null  ? false : true);
  private loginInfo: AuthLoginInfo;
  public loading = false;
  SetAutoCompleteOff:string = 'new-password';
  userNameClass: string = 'form-control input-vac';
  userNameClassErrorMsg: string = '';
  passwordClass: string = 'form-control input-vac';
  passwordClassErrorMsg: string = '';
  confrimPasswordClass: string = 'form-control input-vac';
  confrimPasswordClassErrorMsg: string = '';
  emailClass : string = 'form-control input-vac' ;
  emailClassErrorMsg : string = '';
  telClass : string = 'form-control no-spinners input-vac' ;
  telClassErrorMsg : string = '';

  emailForgetModalClass : string = 'form-control no-spinners input-vac' ;
  emailForgetModalClassError : string = '';

  newTrustFormVisible : boolean = false;
  userNameModalClass : string  = 'form-control input-vac'
  passwordModalClass : string  = 'form-control input-vac'
  LoginClassErrorMsg : string = '';
  LoginClassErrorMsg1 : string = '';
  LoginClassErrorMsg2 : string = '';
  forgetPassErrorMsg : string = '';
  CreateUserError : string = '';
  dialogSuccessMessage : string = this.LANGUAGE.msgSaved; 
  loading1 = false;
  user: User;


  save(): void {
    this.loading1 = true;
  }
  constructor(
    private modalService: NgbModal,
    private modalRefService: NgbActiveModal,
    private modalRefServiceRegister : NgbActiveModal,
    private modalForgetPassword : NgbActiveModal,
    private modalLoginModal:NgbActiveModal,
    private modalRejectByReason : NgbActiveModal,
    private loginService: AuthService,
    private tokenStored: TokenStorageService,
    private httpClient : HttpClientService,
    private translate: TranslateService,
    public router: Router    

    ) {
      translate.addLangs(['th','en']);
      translate.reloadLang((this.tokenStored.getLanguage() || 'th')).toPromise().then(result => {
          this.LANGUAGE = result;
       });
     }

    ngOnInit() {
     
    }
  
 

  
  PopupConfirm(){
    console.log("PopupConfirm");
    this.userNameModalClass = 'form-control input-vac';
    this.LoginClassErrorMsg = '';
    this.passwordModalClass = 'form-control input-vac';
    this.LoginClassErrorMsg = '';
    this.username = '';
    this.password = '';
    this.modalLoginModal = this.modalService.open(this.loginModal);
  }

  openRegister(){
    this.CreateUserError = '';
    this.newTrustFormVisible = false;
    this.modalService.dismissAll();
    this.createProfile =  {password : '',passwordConfirm : '',email : '',userName : '' , firstName : '', lastName : '',tel_1:''};
    this.userNameClass = 'form-control input-vac';
    this.userNameClassErrorMsg = '';
    this.passwordClass = 'form-control input-vac';
    this.passwordClassErrorMsg = '';
    this.confrimPasswordClass = 'form-control input-vac';
    this.confrimPasswordClassErrorMsg = '';
    this.emailClass = 'form-control input-vac' ;
    this.emailClassErrorMsg  = '';
    this.telClass = 'form-control no-spinners input-vac' ;
    this.telClassErrorMsg = '';
    this.modalRefServiceRegister =  this.modalService.open(this.registerModal, {windowClass:"myCustomModalClass"})  
  }
 
  checkLogin(){
    this.loginInfo = new AuthLoginInfo(
      this.form.username = this.username,
      this.form.password = this.password
    );
  
    let isNull = 0;
    if(this.form.username === ''){
      isNull = isNull+1;
      this.userNameModalClass = 'form-control input-vac-err';
      this.LoginClassErrorMsg = this.LANGUAGE.pleaseEnterUsernameAndPassword;
    }else{
      this.userNameModalClass = 'form-control input-vac';
      this.LoginClassErrorMsg = '';
    }
     if(this.form.password === ''){
      isNull = isNull+1;
      this.passwordModalClass = 'form-control input-vac-err';
      this.LoginClassErrorMsg = this.LANGUAGE.pleaseEnterUsernameAndPassword;
    }else{
      this.passwordModalClass = 'form-control input-vac';
      this.LoginClassErrorMsg = '';
    }

    if(isNull == 0){
      (this.loginService.authenticate(this.loginInfo).subscribe(
        (data: User)=> {
          this.user = data;
          let status = {status : 'success'}
          console.log(data)

          this.tokenStored.saveToken(this.user.token);
          this.tokenStored.saveUserid(this.user.userId);
          this.tokenStored.saveUsername(this.user.userFname);

            // // console.log(userProfile);
            // this.tokenStored.saveUserProfile(userProfile);
            this.invalidLogin = true;
            this.messageEvent.emit(JSON.stringify(status));
            this.modalService.dismissAll();
          }
        ,error => {
          let status = {status : 'false'}
          this.LoginClassErrorMsg = this.LANGUAGE.userAndPassincorrect;
          this.invalidLogin = false; 
          this.messageEvent.emit(JSON.stringify(status));
        }
      ))
      }
  }
  createUser(policyModal){  
  }
  closeCreateUser(){
    this.createProfile =  {password : '',passwordConfirm : '',email : '',userName : '' , firstName : '', lastName : '',tel_1:''};
    this.LoginClassErrorMsg1='';
    this.LoginClassErrorMsg2='';
    this.modalService.dismissAll();
     
  }
  closePolicy(closeModal){
    this.newTrustFormVisible = false;
    this.modalRefServiceRegister = this.modalService.open(closeModal, {windowClass:"myCustomModalClass",backdrop:'static'});
    this.modalRefService.close();
  }
  acceptPolicy(registerModel){
  }
  onValidatePassword(value){
      if(value != ''){
        if(value.length >= 8 && value.length <= 16){
        this.passwordValidate = true;
        this.passwordClass = 'form-control input-vac';
        this.passwordClassErrorMsg = '';
      }else{
        this.passwordClass = 'form-control input-vac-err';
        this.passwordClassErrorMsg = this.LANGUAGE.PasswordMsgCharacters;
        this.passwordValidate = false;
      }
    }
  }
  numberOnly(event): boolean {
      var vchar = String.fromCharCode((event.which) ? event.which : event.keyCode);
    if ((vchar<'0' || vchar>'9')){
      return false;
    }
    return true;
  }
  onKeydown(event){
    if (event.key === "Enter") {
      this.checkLogin();
    }
  }
  openForgetModal(modalForget){
    this.emailForget = '';
     this.forgetPassErrorMsg = '';
     this.modalLoginModal.close();
     this.modalForgetPassword =  this.modalService.open(modalForget,{windowClass:"myCustomModalClass",backdrop:'static'});
  }
  closeForgetModel(modalLogin){
      this.modalForgetPassword.close();
      this.modalLoginModal = this.modalService.open(modalLogin,{windowClass:"myCustomModalClass"});
  }
  closeModal(){
    this.dialogSuccessMessage = '';
    this.modalService.dismissAll();
  }
  openModal(){
    this.modalService.open(this.dialogSuccess,{backdrop : 'static'});
  }
}

