import { Component, OnInit } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-vac-footer',
  templateUrl: './vac-footer.component.html',
  styleUrls: ['./vac-footer.component.scss']
})
export class VacFooterComponent implements OnInit {

  constructor( 
  	private tokenStored: TokenStorageService,
    private translate: TranslateService) {
      translate.addLangs(['th','en']);
      translate.reloadLang((this.tokenStored.getLanguage() || 'th')).toPromise().then(result => {
          this.LANGUAGE = result;
    
       });
    }
    LANGUAGE : any = {};
  ngOnInit() {
  }
  
}
