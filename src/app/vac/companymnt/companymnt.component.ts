import { AfterViewInit, Component ,OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { TokenStorageService } from '../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService} from '@ngx-translate/core';

import { CompanyService } from '../services/company.service';
import { BranchService } from '../services/branch.service';
import { Company } from '../models/company';
import { Branch } from '../models/branch';


@Component({
  selector: 'app-companymnt',
  templateUrl: './companymnt.component.html',
  styleUrls: ['./companymnt.component.scss']
})

export class CompanymntComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [];
  branchDisplayedColumns: string[] = [];

  dataSource = new MatTableDataSource<CompanyElement>();
  public elements: CompanyElement[] = [];
  public element: CompanyElement;

  branchDataSource = new MatTableDataSource<BranchElement>();
  public branchElements: BranchElement[] = [];
  public branchElement: BranchElement;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @ViewChild('searchCompanyModal',{static: false}) searchCompanyModal;
  @ViewChild('confirmDeleteModal',{static: false}) confirmDeleteModal;
  @ViewChild('branchModal',{static: false}) branchModal;
  @ViewChild('confirmBranchDeleteModal',{static: false}) confirmBranchDeleteModal;


  public companys: Company[] = [];
  company: Company;
  branch: Branch;
  branchs: Branch[];
  

  LANGUAGE : any = {}

  searchCompCode : string = '';
  searchCompName : string = '';
  searchCompCodeErrorMsg: string = '';
  searchCompNameErrorMsg: string = '';

  displayDetail: boolean = false;
  addFlag: boolean = false;
  addBranchFlag: boolean = false;

  // Form data
  compCode: string = '';
  nameEn: string = '';
  nameTh: string = '';
  addr1: string = '';
  addr2: string = '';
  addr3: string = '';
  zip: string = '';
  tel: string = '';
  fax: string = '';
  email: string = '';
  webSite: string = '';
  regId: string = '';
  regDate: string = '';
  vatRate: string = '';

  compCodeErrorMsg: string = '';
  nameEnErrorMsg: string = '';
  nameThErrorMsg: string = '';
  addr1ErrorMsg: string = '';
  addr2ErrorMsg: string = '';
  addr3ErrorMsg: string = '';
  zipErrorMsg: string = '';
  telErrorMsg: string = '';
  faxErrorMsg: string = '';
  emailErrorMsg: string = '';
  webSiteErrorMsg: string = '';
  regIdErrorMsg: string = '';
  regDateErrorMsg: string = '';
  vatRateErrorMsg: string = '';

  // Form barnch data
  branchCode: string = '';
  branchNameTh: string = '';
  branchNameEn: string = '';
  branchAddr1: string = '';
  branchAddr2: string = '';
  branchAddr3: string = '';
  branchZip: string = '';
  branchTel: string = '';
  branchFax: string = '';
  branchWebSite: string = '';
  branchRegId: string = '';
  branchRegDate: string = '';
  branchVatRate: string = '';

  branchCodeErrorMsg: string = '';
  branchNameThErrorMsg: string = '';
  branchNameEnErrorMsg: string = '';
  branchAddr1ErrorMsg: string = '';
  branchAddr2ErrorMsg: string = '';
  branchAddr3ErrorMsg: string = '';
  branchZipErrorMsg: string = '';
  branchTelErrorMsg: string = '';
  branchFaxErrorMsg: string = '';
  branchWebSiteErrorMsg: string = '';
  branchRegIdErrorMsg: string = '';
  branchRegDateErrorMsg: string = '';
  branchVatRateErrorMsg: string = '';
  // -------------------

  constructor(
    private tokenStored: TokenStorageService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private modalRefService: NgbActiveModal,
    private companyService: CompanyService,
    private branchService: BranchService,
    ) {
      translate.addLangs(['th','en']);
      translate.reloadLang((this.tokenStored.getLanguage() || 'th')).toPromise().then(result => {
          this.LANGUAGE = result;
       });
     }

  ngOnInit() {
    this.displayedColumns = ['compCode', 'nameTh', 'nameEn'];
    this.companyService.getData().subscribe((res)=>{
      this.companys = res;
      this.fillElement(this.companys);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fillElement(companys: Company[]) {
    this.displayDetail = false;
    this.elements = [];
    var ii=0;
    while (ii<companys.length) {
      this.element = new CompanyElement();
      this.element.compCode = this.companys[ii].compCode;
      this.element.nameTh = this.companys[ii].nameTh;
      this.element.nameEn = this.companys[ii].nameEn;
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

  fillBranchElement(branchs: Branch[]) {
    this.branchDisplayedColumns = ['branchCode','nameTh', 'nameEn'];
    this.branchElements = [];
    var ii=0;
    while (ii<branchs.length) {
      this.branchElement = new BranchElement();
      this.branchElement.branchCode = this.branchs[ii].branchCode;
      this.branchElement.nameTh = this.branchs[ii].nameTh;
      this.branchElement.nameEn = this.branchs[ii].nameEn;
      this.branchElements.push(this.branchElement);
    ii++;
    }
    this.branchDataSource = new MatTableDataSource(this.branchElements); 
  }


  searchCompany() {
    if (this.searchCompCode!='' && this.searchCompName=='') {
        this.companyService.getByCompCode(this.searchCompCode).subscribe((res)=>{
        this.companys = res;
        this.fillElement(this.companys);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.closesearchCompanyModal();
      });
    } else {
      this.companyService.getByCompName(this.searchCompName).subscribe((res)=>{
        this.companys = res;
        this.fillElement(this.companys);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.closesearchCompanyModal();
      });

    }

  }

  addClick() {
    this.addFlag = true;
    this.displayDetail = true;

    this.compCode = '';
    this.nameEn = '';
    this.nameTh = '';
    this.addr1 = '';
    this.addr2 = '';
    this.addr3 = '';
    this.zip = '';
    this.tel = '';
    this.fax = '';
    this.email = '';
    this.webSite = '';
    this.regId = '';
    this.regDate = '';
    this.vatRate = '';
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

  rowClick(company: Company) {
    // alert("Test: " + user.userId)
    this.addFlag = false;
    this.displayDetail = true;
    this.companyService.getRecord(company).subscribe((res)=>{
      this.company = res;
      if (this.company.respMsg=="Completed") {
        this.compCode = this.company.compCode;
        this.nameEn = this.company.nameEn;
        this.nameTh = this.company.nameTh;
        this.addr1 = this.company.addr1;
        this.addr2 = this.company.addr2;
        this.addr3 = this.company.addr3;
        this.zip = this.company.zip;
        this.tel = this.company.tel;
        this.fax = this.company.fax;
        this.email = this.company.email;
        this.webSite = this.company.webSite;
        this.regId = this.company.regId;
        this.regDate = this.company.regDate;
        this.vatRate = this.company.vatRate;
            
        this.getBranchs();
      } 
      });

  }

  openSearchCompanyModal(){
    this.searchCompCode = '';
    this.modalService.open(this.searchCompanyModal,{backdrop:'static'});
  }

  closesearchCompanyModal(){
    this.searchCompCode = '';
    this.searchCompName = '';
    this.modalService.dismissAll();
  }

  addRecord() {
    if (this.compCode=='') {
      this.compCodeErrorMsg = 'Required'
      return;
    }
    if (this.nameTh=='') {
      this.nameThErrorMsg = 'Required'
      return;
    }
    if (this.nameEn=='') {
      this.nameEnErrorMsg = 'Required'
      return;
    }
    this.compCodeErrorMsg = ''; 
    this.nameThErrorMsg = ''; 
    this.nameEnErrorMsg = '';

    this.company = new Company();
    this.company.compCode = this.compCode;
    this.company.nameEn = this.nameEn;
    this.company.nameTh = this.nameTh;
    this.company.addr1 = this.addr1;
    this.company.addr2 = this.addr2;
    this.company.addr3 = this.addr3;
    this.company.zip = this.zip;
    this.company.tel = this.tel;
    this.company.fax = this.fax;
    this.company.email = this.email;
    this.company.webSite = this.webSite;
    this.company.regId = this.regId;
    this.company.regDate = this.regDate;
    this.company.vatRate = this.vatRate;


    this.companyService.createNew(this.company).subscribe((res)=>{
      //console.log("Res=" + res);
      this.company = res;
      this.goHome();
    });

  }

  saveUpdate() {
    if (this.nameTh=='') {
      this.nameThErrorMsg = 'Required'
      return;
    }
    if (this.nameEn=='') {
      this.nameEnErrorMsg = 'Required'
      return;
    }

    this.nameThErrorMsg = ''; 
    this.nameEnErrorMsg = '';

    this.company.compCode = this.compCode;
    this.company.nameEn = this.nameEn;
    this.company.nameTh = this.nameTh;
    this.company.addr1 = this.addr1;
    this.company.addr2 = this.addr2;
    this.company.addr3 = this.addr3;
    this.company.zip = this.zip;
    this.company.tel = this.tel;
    this.company.fax = this.fax;
    this.company.email = this.email;
    this.company.webSite = this.webSite;
    this.company.regId = this.regId;
    this.company.regDate = this.regDate;
    this.company.vatRate = this.vatRate;

    this.companyService.saveUpdate(this.company).subscribe((res)=>{
      //console.log("Res=" + res);
      this.company = res;
    });
    alert('saved');
  }

  deleteRecord() {
      //console.log('Delete')
      this.company.compCode = this.compCode;
      this.companyService.deleteRecord(this.company).subscribe((res)=>{
        //console.log("Res=" + res);
        this.company = res;
        this.goHome();
      });
  }
  
  goHome() {
    //Refresh
    this.searchCompany();
    this.displayDetail = false;
    this.modalService.dismissAll();
  }


  getBranchs() {
    this.branchService.getByCompCode(this.compCode).subscribe((res)=>{
      //console.log("Res=" + res);
      this.branchs = res;
      this.fillBranchElement(this.branchs);
     });
  }

  addBranchClick() {
    this.addBranchFlag = true;

    this.branchCode = '';
    this.branchNameEn = '';
    this.branchNameTh = '';
    this.branchAddr1 = '';
    this.branchAddr2 = '';
    this.branchAddr3 = '';
    this.branchZip = '';
    this.branchTel = '';
    this.branchFax = '';
    this.branchWebSite = '';
    this.branchRegId = '';
    this.branchRegDate = '';
    this.branchVatRate = '';

    this.modalService.open(this.branchModal,{backdrop:'static'});

  }

  selectBranchClick(branch: Branch) {
    this.addBranchFlag = false;
    branch.compCode = this.compCode;
    this.branchService.getRecord(branch).subscribe((res)=>{
      this.branch = res;
      if (this.branch.respMsg=="Completed") {
        this.branchCode = this.branch.branchCode;
        this.branchNameEn = this.branch.nameEn;
        this.branchNameTh = this.branch.nameTh;
        this.branchAddr1 = this.branch.addr1;
        this.branchAddr2 = this.branch.addr2;
        this.branchAddr3 = this.branch.addr3;
        this.branchZip = this.branch.zip;
        this.branchTel = this.branch.tel;
        this.branchFax = this.branch.fax;
        this.branchWebSite = this.branch.webSite;
        this.branchRegId = this.branch.regId;
        this.branchRegDate = this.branch.regDate;
        this.branchVatRate = this.branch.vatRate;
        this.modalService.open(this.branchModal,{backdrop:'static'});
      } 
      });
  }

  saveBranchClick() {
    if (this.addBranchFlag) {
      this.branchAddRecord();
    } else {
      this.branchSaveRecord();
    }
  }

  deleteBranchClick() {
    this.modalService.open(this.confirmBranchDeleteModal,{backdrop:'static'});
  }

  closeBranchModal() {
    this.modalService.dismissAll();
  }

  branchAddRecord() {
    if (this.branchCode=='') {
      this.branchCodeErrorMsg = 'Required'
      return;
    }
    if (this.branchNameTh=='') {
      this.branchNameThErrorMsg = 'Required'
      return;
    }
    if (this.branchNameEn=='') {
      this.branchNameEnErrorMsg = 'Required'
      return;
    }
    this.branchCodeErrorMsg = ''; 
    this.branchNameThErrorMsg = ''; 
    this.branchNameEnErrorMsg = '';

    this.branch = new Branch();
    this.branch.compCode = this.compCode;
    this.branch.branchCode = this.branchCode;
    this.branch.nameEn = this.branchNameEn;
    this.branch.nameTh = this.branchNameTh;
    this.branch.addr1 = this.branchAddr1;
    this.branch.addr2 = this.branchAddr2;
    this.branch.addr3 = this.branchAddr3;
    this.branch.zip = this.branchZip;
    this.branch.tel = this.branchTel;
    this.branch.fax = this.branchFax;
    this.branch.webSite = this.branchWebSite;
    this.branch.regId = this.branchRegId;
    this.branch.regDate = this.branchRegDate;
    this.branch.vatRate = this.branchVatRate;


    this.branchService.createNew(this.branch).subscribe((res)=>{
      //console.log("Res=" + res);
      this.branch = res;
      this.modalService.dismissAll();
      this.getBranchs();
    });

  }

  branchSaveRecord() {
    if (this.branchCode=='') {
      this.branchCodeErrorMsg = 'Required'
      return;
    }
    if (this.branchNameTh=='') {
      this.branchNameThErrorMsg = 'Required'
      return;
    }
    if (this.branchNameEn=='') {
      this.branchNameEnErrorMsg = 'Required'
      return;
    }
    this.branchCodeErrorMsg = ''; 
    this.branchNameThErrorMsg = ''; 
    this.branchNameEnErrorMsg = '';

    this.branch = new Branch();
    this.branch.compCode = this.compCode;
    this.branch.branchCode = this.branchCode;
    this.branch.nameEn = this.branchNameEn;
    this.branch.nameTh = this.branchNameTh;
    this.branch.addr1 = this.branchAddr1;
    this.branch.addr2 = this.branchAddr2;
    this.branch.addr3 = this.branchAddr3;
    this.branch.zip = this.branchZip;
    this.branch.tel = this.branchTel;
    this.branch.fax = this.branchFax;
    this.branch.webSite = this.branchWebSite;
    this.branch.regId = this.branchRegId;
    this.branch.regDate = this.branchRegDate;
    this.branch.vatRate = this.branchVatRate;


    this.branchService.saveUpdate(this.branch).subscribe((res)=>{
      //console.log("Res=" + res);
      this.branch = res;
      this.modalService.dismissAll();
      this.getBranchs();
    });

  }

  branchDeleteRecord() {
    //console.log('Delete')
    this.branch.compCode = this.compCode;
    this.branch.branchCode = this.branchCode;
    this.branchService.deleteRecord(this.branch).subscribe((res)=>{
      this.branch = res;
      this.modalService.dismissAll();
      this.getBranchs();
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
export class CompanyElement {
  checked: boolean;
  compCode: string;
  nameTh: string;
  nameEn: string;
  highlighted?: boolean;
  hovered?: boolean;
}

export class BranchElement {
  checked: boolean;
  branchCode: string;
  nameTh: string;
  nameEn: string;
}
// --------------


