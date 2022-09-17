import { AfterViewInit, Component ,OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { TokenStorageService } from '../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService} from '@ngx-translate/core';

import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { Role } from '../models/role';


@Component({
  selector: 'app-usermnt',
  templateUrl: './usermnt.component.html',
  styleUrls: ['./usermnt.component.scss']
})

export class UsermntComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [];
  roleDisplayedColumns: string[] = [];

  dataSource = new MatTableDataSource<UsermntElement>();
  public elements: UsermntElement[] = [];
  public element: UsermntElement;

  roleDataSource = new MatTableDataSource<UsermntRoleElement>();
  public roleElements: UsermntRoleElement[] = [];
  public roleElement: UsermntRoleElement;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @ViewChild('searchUserModal',{static: false}) searchUserModal;
  @ViewChild('confirmDeleteModal',{static: false}) confirmDeleteModal;


  public users: User[] = [];
  user: User;
  role: Role;
  roles: Role[];
  userRoles: Role[];
  

  LANGUAGE : any = {}

  searchUserId : string = '';
  searchUserName : string = '';
  searchUserIdErrorMsg: string = '';
  searchUserNameErrorMsg: string = '';

  displayDetail: boolean = false;
  addFlag: boolean = false;

  // Form data
  userId: string = '';
  userFname: string = '';
  userLname: string = '';
  password: string = '';
  email: string = '';
  phone1: string = '';
  phone2: string = '';

  userIdErrorMsg: string = '';
  userFnameErrorMsg: string = '';
  userLnameErrorMsg: string = '';
  passwordErrorMsg: string = '';
  emailErrorMsg: string = '';
  phone1ErrorMsg: string = '';
  phone2ErrorMsg: string = '';

  // -------------------


  constructor(
    private tokenStored: TokenStorageService,
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
    // this.displayedColumns = ['checked','userId', 'userName', 'compCode'];
    this.displayedColumns = ['userId', 'userName', 'compCode'];
    this.usersService.getRecordsById('%').subscribe((res)=>{
      this.users = res;
      this.fillElement(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fillElement(users: User[]) {
    this.displayDetail = false;
    this.elements = [];
    var ii=0;
    while (ii<users.length) {
      this.element = new UsermntElement();
      this.element.userId = this.users[ii].userId;
      this.element.userName = this.users[ii].userFname + " " + this.users[ii].userLname;
      this.element.compCode = this.users[ii].compCode;
      this.elements.push(this.element);
    ii++;
    }
    this.dataSource = new MatTableDataSource(this.elements); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fillRoleElement(roles: Role[]) {
    this.roleDisplayedColumns = ['checked','roleId', 'roleDesc'];
    this.roleElements = [];
    var ii=0;
    while (ii<roles.length) {
      this.roleElement = new UsermntRoleElement();
      this.roleElement.checked = this.roles[ii].check;
      this.roleElement.roleId = this.roles[ii].roleId;
      this.roleElement.roleDesc = this.roles[ii].roleDesc;
      this.roleElements.push(this.roleElement);
    ii++;
    }
    this.roleDataSource = new MatTableDataSource(this.roleElements); 
  }


  searchUser() {
    if (this.searchUserId!='' && this.searchUserName=='') {
      this.usersService.getRecordsById(this.searchUserId+'%').subscribe((res)=>{
        this.users = res;
        this.fillElement(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.closesearchUserModalModal();
      });
    } else {
      this.usersService.getRecordsByName(this.searchUserName+'%').subscribe((res)=>{
        this.users = res;
        this.fillElement(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.closesearchUserModalModal();
      });

    }

  }

  addClick() {
    this.addFlag = true;
    this.displayDetail = true;
    this.userId = '';
    this.userFname = '';
    this.userLname = '';
    this.password = '';
    this.email = '';
    this.phone1 = '';
    this.phone2 = '';
  }
  saveClick() {
    if (this.addFlag) {
      this.addRecord();
    } else {
      this.saveUpdate();
    }
  }
  deleteClick() {
    this.modalService.open(this.confirmDeleteModal,{backdrop:'static'});
  }

  rowClick(user: User) {
    // alert("Test: " + user.userId)
    this.addFlag = false;
    this.displayDetail = true;
    this.usersService.getRecord(user.userId).subscribe((res)=>{
      this.user = res;
      if (this.user.respMsg=="Completed") {
        this.userId = this.user.userId;
        this.userFname = this.user.userFname;
        this.userLname = this.user.userLname;
        this.password = this.user.password;
        this.email = this.user.email;
        this.phone1 = this.user.phone1;
        this.phone2 = this.user.phone2;
  
        this.getUserRoles();
      } 
      });

  }

  openSearchUserModal(){
    this.searchUserId = '';
    this.modalService.open(this.searchUserModal,{backdrop:'static'});
  }
  closesearchUserModalModal(){
    this.searchUserId = '';
    this.searchUserName = '';
    this.modalService.dismissAll();
  }

  addRecord() {
    if (this.userId=='') {
      this.userIdErrorMsg = 'Required'
      return;
    }
    if (this.userFname=='') {
      this.userFnameErrorMsg = 'Required'
      return;
    }
    if (this.userLname=='') {
      this.userLnameErrorMsg = 'Required'
      return;
    }
    this.userIdErrorMsg = ''; 
    this.userFnameErrorMsg = ''; 
    this.userLnameErrorMsg = '';

    this.user = new User();
    this.user.userId = this.userId;
    this.user.userFname = this.userFname;
    this.user.userLname = this.userLname;
    this.user.password = this.password;
    this.user.email = this.email;
    this.user.phone1 = this.phone1;
    this.user.phone2 = this.phone2;

    this.usersService.createNew(this.user).subscribe((res)=>{
      //console.log("Res=" + res);
      this.user = res;
      this.goHome();
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

  deleteRecord() {
      //console.log('Delete')
      this.user.userId = this.userId;
      this.usersService.deleteRecord(this.user).subscribe((res)=>{
        //console.log("Res=" + res);
        this.user = res;
        this.goHome();
      });
  }
  
  goHome() {
    //Refresh
    this.searchUser();
    this.displayDetail = false;
    this.modalService.dismissAll();
  }


  getUserRoles() {
    this.usersService.getUserRoles(this.userId).subscribe((res)=>{
      //console.log("Res=" + res);
      this.userRoles = res;
      this.getAllRoles();
     });
  }


  getAllRoles() {
    this.usersService.getAllRoles().subscribe((res)=>{
      //console.log("Res=" + res);
      this.roles = res;
      this.roleChecked();
      //
      this.fillRoleElement(this.roles);
      this.roleDataSource.paginator = this.paginator;
      this.roleDataSource.sort = this.sort;
  });
  }

  roleChecked() {
    var roleSize = this.roles.length;
    var userRoleSize = this.userRoles.length;
    //console.log("Size:" + roleSize + " " + userRoleSize);

    for (let ii = 0; ii < roleSize; ii++) {
      this.roles[ii].check = false;
      for (let jj = 0; jj < userRoleSize; jj++) {
        if (this.roles[ii].roleId==this.userRoles[jj].roleId) {
          this.roles[ii].check = true;
        }
      }
    }
  }

  saveRoles() {
    var roleSize = this.roles.length;
    //console.log("Size:" + roleSize + " " + userRoleSize);

    for (let ii = 0; ii < roleSize; ii++) {
      this.roles[ii].check = this.roleElements[ii].checked;
    }
    this.usersService.updateRoles(this.userId,this.roles).subscribe((res)=>{
      //console.log("Res=" + res);
      this.roles = res;
    });
  }


  numberOnly(event): boolean {
    var vchar = String.fromCharCode((event.which) ? event.which : event.keyCode);
    if ((vchar<'0' || vchar>'9')){
      return false;
    }
    return true;

  }




}

// Display table
export class UsermntElement {
  checked: boolean;
  userId: string;
  userName: string;
  compCode: string;
  highlighted?: boolean;
  hovered?: boolean;
}

export class UsermntRoleElement {
  checked: boolean;
  roleId: string;
  roleDesc: string;
}
// --------------


