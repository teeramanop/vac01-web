import { Component, OnInit,OnDestroy , ViewChild } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ParameterUrl } from '../share-class/ParameterUrl'
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClientService } from '../services/httpclient.service';  
// Delete if Login To Ccenter  
//import { AuthLoginInfo } from '../auth/login-info';  
import { AuthService } from '../services/auth.service'
import { VacModalLoginComponent } from '../vac-modal-login/vac-modal-login.component';
import { CookieService } from 'ngx-cookie-service';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { NgcInitializeEvent, NgcStatusChangeEvent,NgcNoCookieLawEvent} from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs/Subscription';
import { TranslateService} from '@ngx-translate/core';
import { AuthLoginInfo } from '../auth/login-info';


@Component({
  selector: 'app-vac-header',
  templateUrl: './vac-header.component.html',
  styleUrls: ['./vac-header.component.scss']
})
export class VacHeaderComponent implements OnInit, OnDestroy {

  @ViewChild(VacModalLoginComponent,{static: false}) vacModal: VacModalLoginComponent;
  // @ViewChild('popupmodal',{static: true}) popupmodal;
  function: string = '';
  cookieValue = 'UNKNOWN';
  invalidLogin: boolean = (this.tokenStored.getUsername() == null  ? false : true);
    private popupOpenSubscription: Subscription;
    private popupCloseSubscription: Subscription;
    private initializeSubscription: Subscription;
    private statusChangeSubscription: Subscription;
    private revokeChoiceSubscription: Subscription;
    private noCookieLawSubscription: Subscription;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private modalpopup:NgbActiveModal,
    private param: ParameterUrl,
    private token: TokenStorageService,
    private tokenStored: TokenStorageService,  
    private ccService: NgcCookieConsentService,
    private service : HttpClientService,
    private cookieService: CookieService,
    private translate: TranslateService) {
      translate.addLangs(['th','en']);
      translate.reloadLang((this.tokenStored.getLanguage() || 'th')).toPromise().then(result => {
          this.LANGUAGE = result;
          console.log(this.LANGUAGE);
          var LAANGUGE_SYMBO = ((this.tokenStored.getLanguage() == 'en' ? '-EN' : '') || '');

       this.banner  = [
          {
            img: 'assets/images/banner/photo-01.jpeg' ,
            responsive : '1024',
          },
          {
            img: 'assets/images/banner/photo-02.jpeg',
            responsive : '1024'
          },
          {
            img: 'assets/images/banner/photo-03.jpeg',
            responsive : '1024'
          },
          {
            img: 'assets/images/banner/photo-04.jpeg',
            responsive : '1024'
          },
          {
            img: 'assets/images/banner/photo-05.jpeg',
            responsive : '1024'
          },
          {
            img: 'assets/images/banner/photo-06.jpeg',
            responsive : '1024'
          },
        ]
     });
    }

  normalScreen:string = "";
  public openSide : boolean = false;
  windowsScreen:number;
  LANGUAGE : any = {};
  languageselect :string;
  
  ngOnInit() {

    // if(this.invalidLogin == false){
    //   this.popup();
    // }
    // this.getCgType();  
    // this.getCgClientType();  
    // this.getCgOnTimeStatus();
    // this.cookieService.set( 'Test', 'Hello World' );
    // this.cookieValue = this.cookieService.get('Test');
    
    this.windowsScreen = window.screen.width;
    // this.languageselect = this.tokenStored.getLanguage();
    // console.log("SCREEN RES >> "+this.windowsScreen);
    // console.log("LANGUAGE >> "+this.tokenStored.getLanguage())

    if (this.windowsScreen <= 480) { // 768px portrait
      this.banner = this.banner.filter(function(item) {
        return item.responsive == 'min';
      });
    }else if(this.windowsScreen > 480 && this.windowsScreen <=768){
      this.banner = this.banner.filter(function(item) {
        return item.responsive == '768';
      });
    }else if(this.windowsScreen > 768 && this.windowsScreen <= 1024){
      this.banner = this.banner.filter(function(item) {
        return item.responsive == '1024';
      });
    }else if(this.windowsScreen > 1024 && this.windowsScreen <= 1280){
      this.banner = this.banner.filter(function(item) {
        return item.responsive == '1280';
      });
    }else if(this.windowsScreen > 1280 && this.windowsScreen <= 1366){
      this.banner = this.banner.filter(function(item) {
        return item.responsive == '1366';
      });
    }else if(this.windowsScreen > 1366 && this.windowsScreen <= 1440){
      this.banner = this.banner.filter(function(item) {
        return item.responsive == '1440'; 
      });
    }else if(this.windowsScreen > 1440  && this.windowsScreen <= 1920){
      this.banner = this.banner.filter(function(item) {
        return  item.responsive=='1920';
      });
    }else if(this.windowsScreen >= 1920 ){
      this.banner = this.banner.filter(function(item) {
        return  item.responsive=='1920'; 
      });
    }

    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
      // this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      // (event: NgcNoCookieLawEvent) => {
      //   // you can use this.ccService.getConfig() to do stuff...
      // });
  }
 
//   popup(){
//     this.modalService.dismissAll();
//     this.modalpopup =  this.modalService.open(this.popupmodal,{windowClass:'popup',backdrop:'static'})
//   }
//   closepopupModel(){
//     this.modalService.dismissAll();
// }
  openregis(){
    this.vacModal.openRegister();
}


  banner = [
  ]
  
  teamcarouselOptions= {
    items: 1,
    nav: false,
    navClass: ['', ''],
    navText: ['', ''],
    dots: true,
    autoplay: true,
    autoplayTimeout: 9000 ,
    duration: 1000,
    paginationSpeed : 600,
    smartSpeed: 1100 ,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navContainer: false	
  }


 openLogin(){  
  }

  clearFilter(option){  
  }


  ngOnDestroy() {
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  toggleSidebar(){
    this.openSide = !this.openSide
  }

  closeOverlay(){
    this.openSide = false
  }
}
