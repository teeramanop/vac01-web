import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal,NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { AuthLoginInfo } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';
import {  HttpClientService } from '../services/httpclient.service'
import { TranslateModule,TranslateLoader,TranslatePipe } from '@ngx-translate/core';
import { Menu, NavService } from '../services/nav.service';
import { VacModalLoginComponent } from '../vac-modal-login/vac-modal-login.component';
import { TranslateService} from '@ngx-translate/core';
import { Location } from "@angular/common";

import { Menuitem } from '../models/menuitem';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-vac-menu',
  templateUrl: './vac-menu.component.html',
  styleUrls: ['./vac-menu.component.scss']
})

export class VacMenuComponent implements OnInit {



  @ViewChild(VacModalLoginComponent,{static: false}) vacModal: VacModalLoginComponent;

  public menuItems: Menu[];
  public openSide : boolean = false;
  public activeItem: string = 'home';
  public active: boolean = false;
  public activeChildItem : string = '' 
  public overlay: boolean = false;
  public pathName : string = window.location.pathname;

  passwordValidate : boolean = false;
  form: any = {};
  LANGUAGE : any = {};
  username = '';
  password = '';
  createProfile: any =  {password : '',passwordConfirm : '',email : '',userName : '' , firstName : '', lastName : '',tel:''};
  invalidLogin: boolean = (this.tokenStored.getUsername() == null  ? false : true);
  private loginInfo: AuthLoginInfo;

  userNameClass: string = 'form-control';
  userNameClassErrorMsg: string = '';
  passwordClass: string = 'form-control';
  passwordClassErrorMsg: string = '';
  confrimPasswordClass: string = 'form-control';
  confrimPasswordClassErrorMsg: string = '';
  emailClass : string = 'form-control' ;
  emailClassErrorMsg : string = '';
  firstNameClass : string = 'form-control' ;
  firstNameClassErrorMsg : string = '';
  lastNameClass : string = 'form-control' ;
  lastNameClassErrorMsg : string = '';
  telClass : string = 'form-control no-spinners';
  telClassErrorMsg : string = '';
  newTrustFormVisible : boolean = false;
  userNameModalClass : string  = 'form-control'
  passwordModalClass : string  = 'form-control'
  LoginClassErrorMsg : string = '';
  CreateUserError : string = '';

  language : any = {};
  route: string;

  menuitems: Menuitem[];

  securityadminproc: boolean;
  usermntact: boolean;

  setupproc: boolean;
  companymntact: boolean;
  warehousemntact: boolean;

  menuGroup: Array<any> = [];
  menuList: Array<any> = [];
  isEn: boolean = false;


  constructor( 
    private usersService: UsersService,    
    public navServices: NavService,
    public modalService: NgbModal,
    public tokenStored: TokenStorageService,
    public router: Router,
    public translate: TranslateService,
    public location: Location) {
      translate.addLangs(['th','en']);
      translate.reloadLang((this.tokenStored.getLanguage() || 'th')).toPromise().then(result => {
          this.LANGUAGE = result;
      
       });
      router.events.subscribe(val => {
          this.route = location.path();
      });
      }
  isDisplay = false;
  serviceDesc = []
  
  toggleDisplay(){
    this.isDisplay = !this.isDisplay;
  }
  bottom(){
    this.openSide = false
  }
  
  Longselect(lang){
    this.tokenStored.saveLanguage(lang);
    // this.router.navigate(['']);
    window.location.reload();
    this.ngOnInit();
  }

  ngOnInit() {
    
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.translate.setDefaultLang('th');
      
    });
    
    if(this.tokenStored.getUsername() != null){
      this.invalidLogin = true;
    }else{
      this.invalidLogin = false;
    }
    if(!this.tokenStored.getLanguage()){
      this.tokenStored.saveLanguage("th");
      this.isEn=false;
    }
      if(this.tokenStored.getLanguage() =='en'){
        this.translate.currentLang= 'en';
        if(this.LANGUAGE = this.translate.store.translations.en != undefined){
          this.LANGUAGE = this.translate.store.translations.en.MENU;
        }
       // this.translate.setDefaultLang('en');
        this.translate.use('en');
         this.translate.reloadLang('en').toPromise().then(result => {
          this.LANGUAGE = result;
    
        });
        this.isEn=true;
        
      }else{
        this.translate.currentLang= 'th';
        if(this.LANGUAGE = this.translate.store.translations.th != undefined){
          this.LANGUAGE = this.translate.store.translations.th.MENU;
        }
        //this.translate.setDefaultLang('th');
        this.translate.use('th');
        this.translate.reloadLang('th').toPromise().then(result => {
          this.LANGUAGE = result;
    
         });
        this.isEn=false;

      }

      // this.securityadminproc = false;
      // this.usermntact = false;

      // this.setupproc = false;
      // this.companymntact = false;
      // this.warehousemntact = false;

    //this.menuitems = new Menuitem;
    this.usersService.getMenu().subscribe((res)=>{
      //console.log("Res=" + res);
      this.menuitems = res;
      //console.log("menuitems=" + this.menuitems);
      this.dspMenu();
    });
    //console.log("** Get menu **");

  
  }
  dspMenu() {
    // for(let i=0; i<this.menuitems.length; i++){
    //   //console.log(this.menuitems[i].progId);

    //   // Security Admin
    //   if (this.menuitems[i].progId=='usermnt') {
    //     this.securityadminproc = true;
    //     this.usermntact = true;
    //   }
    //   // Setup
    //   if (this.menuitems[i].progId=='companymnt') {
    //     this.setupproc = true;
    //     this.companymntact = true;
    //   }
    //   if (this.menuitems[i].progId=='warehousemnt') {
    //     this.setupproc = true;
    //     this.warehousemntact = true;
    //   }
    // }

    // Test

    const groupbyProcessName = this.menuitems.reduce((acc, current) => {
      if (!(current.workflowProcessName in acc)) {
        acc[current.workflowProcessName]  = [];
      }
      acc[current.workflowProcessName].push(current);
      return acc;
    }, {});

    this.menuGroup = Object.keys(groupbyProcessName).map(key => {
      const menuItems = groupbyProcessName[key];
      return {
        processId: menuItems[0].workflowProcessId,
        processName: key,
        procIds: menuItems.map(item => ({ progId: item.progId, progName: item.progName, progDesc: item.progDesc})),
      };
    });

    console.log(JSON.stringify(this.menuGroup));
    
  }

  toggleSidebar(){
    this.openSide = !this.openSide
  }

  closeOverlay(){
    this.openSide = false
  }

  //For Active Main menu in Mobile View
  setActive(menuItem){
    if (this.activeItem === menuItem) {
      this.activeItem = ''
    } else {
      this.activeItem = menuItem
    }
  }

  isActive(item){
    return this.activeItem === item 
  }

  // For Active Child Menu in Mobile View
  setChildActive(subMenu){
    if (this.activeChildItem === subMenu) {
      this.activeChildItem = ''
    } else {
      this.activeChildItem = subMenu
    }
  }

  ischildActive(subMenu){
    return this.activeChildItem === subMenu 
  }

  openLogin(){
    this.vacModal.PopupConfirm();
  }

  openService(content){
    this.openSide = false
  }
  
  logout(){
    this.tokenStored.signOut();
    this.modalService.dismissAll();
    this.createProfile =  {password : '',passwordConfirm : '',email : '',userName : '' , firstName : '', lastName : '',tel:''};
  }

  receiveModalPopup(event){
    //console.log("after popup");
    //console.log(event);
    //this.router.navigate(['']);

    let element:HTMLElement = document.getElementById('home') as HTMLElement;
    element.click();
  }


}


