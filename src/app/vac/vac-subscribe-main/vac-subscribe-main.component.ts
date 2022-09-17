import { Component, OnInit } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClientService } from '../services/httpclient.service';
import { ParameterUrl } from '../share-class/ParameterUrl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vac-subscribe-main',
  templateUrl: './vac-subscribe-main.component.html',
  styleUrls: ['./vac-subscribe-main.component.scss']
})
export class VacSubscribeMainComponent implements OnInit {

  constructor(    
  	private translate: TranslateService,
    private tokenStored: TokenStorageService,
    private clientservice: HttpClientService,
    private param : ParameterUrl,
    private rounter : Router) {
      translate.addLangs(['th','en']);
      translate.reloadLang((this.tokenStored.getLanguage() || 'th')).toPromise().then(result => {
          this.LANGUAGE = result;
          this.item = [
            { 
              img: "assets/images/genstar/Content-08.jpg",
              name: this.LANGUAGE.Footer_Blog_Detail8,
              description: this.LANGUAGE.Knowledge_Detail_Main_8,
              description_5: "",
              orther:this.LANGUAGE.Buttom_detail_1,
              link:"knowledge8"
            }
            ,
            { 
              img: "assets/images/genstar/Content-07.jpg",
              name: this.LANGUAGE.Footer_Blog_Detail7,
              description: this.LANGUAGE.Knowledge_Detail_Main_7,
              description_5: "",
              orther:this.LANGUAGE.Buttom_detail_1,
              link:"knowledge7"
            }
            ,
            { 
              img: "assets/images/genstar/Content-06.jpg",
              name: this.LANGUAGE.Footer_Blog_Detail6_1,
              description: this.LANGUAGE.Knowledge_Detail_Main_6,
              description_5: "",
              orther:this.LANGUAGE.Buttom_detail_1,
              link:"knowledge6"
            }
            ,
            { 
              img: "assets/images/genstar/Content-05.jpg",
              name: this.LANGUAGE.Footer_Blog_Detail5,
              description: this.LANGUAGE.Knowledge_Detail_Main_5,
              description_5: "",
              orther:this.LANGUAGE.Buttom_detail_1,
              link:"knowledge5"
            }
            ,
            { 
              img: "assets/images/genstar/Content-04.jpg",
              name: this.LANGUAGE.Footer_Blog_Detail3,
              description: this.LANGUAGE.Knowledge_Detail_Main_3,
              description_1: "",
              orther:this.LANGUAGE.Buttom_detail_1,
              link:"knowledge4"
            }
            ,
          {
            img: "assets/images/genstar/Content-02.jpg",
            name: this.LANGUAGE.Footer_Blog_Detail2,
            description: this.LANGUAGE.Knowledge_Detail_Main_2,
            description_1: "",
            description_2: "",
            orther:this.LANGUAGE.Buttom_detail_1,
            link:"knowledge2"
          },
          { 
            img: "assets/images/genstar/Content-03.jpg",
            name: this.LANGUAGE.Footer_Blog_Detail4,
            description: this.LANGUAGE.Knowledge_Detail_Main_4,
            description_1: "",
            orther:this.LANGUAGE.Buttom_detail_1,
            link:"knowledge3"
          },
          { img: "assets/images/genstar/Content-01.jpg",
            name: this.LANGUAGE.Footer_Blog_Detail1,
            description: this.LANGUAGE.Knowledge_Detail_Main_1,
            description_1: "",
            orther: this.LANGUAGE.Buttom_detail_1,
            link:"knowledge1"
          },
          ]
          
       });
    }
    LANGUAGE : any = {}
    ListContent : any;
    type : string = 'knowledge';
  ngOnInit() {
    this.type 
  }

  goContentbyId(contentId){

  }
  mapListContent(Response){
    this.ListContent = Response 
  }
  item = []
  

  teamcarouselOptions= {
    nav: true,
    navClass: ['owl-prev', 'owl-next'],
    navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
    dots:false,
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2,
            margin: 0
        },
        991: {
            items: 3,
            margin: 0
        }
    }
  }
}
