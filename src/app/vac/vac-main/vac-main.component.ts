import { Component, OnInit,ViewChild } from '@angular/core';
import { VacHeaderComponent } from '../vac-header/vac-header.component';
import { TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-vac-main',
  templateUrl: './vac-main.component.html',
  styleUrls: ['./vac-main.component.scss']
})
export class VacMainComponent implements OnInit {
	
	@ViewChild(VacHeaderComponent,{static: false}) vacHeaderModel: VacHeaderComponent;
  constructor(
   private translate: TranslateService) {
      translate.addLangs(['th','en']);
      translate.reloadLang('en').toPromise().then(result => {
          this.vacHeaderModel.LANGUAGE = result;
         
       });
      translate.setDefaultLang('th');
      translate.use('th');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/th|en/) ? browserLang :'th'); 
    }

  ngOnInit() {
  }

}
