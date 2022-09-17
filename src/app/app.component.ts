import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ColorScssService } from './vac/services/color-scss.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    private metaService: Meta
  ) {}

  ngOnInit() {
    // this.title.setTitle('Careadviser');
    this.colorPicker.setColorScheme('color-13');
    // this.metaService.addTags([
    //   {name:'viewport' ,content:'width=device-width, initial-scale=1'},
    //   {name: 'keywords', content: 'ผู้ช่วยพยาบาล,วิตามินบี 12,นวัตกรรม ผู้สูงอายุ,ศูนย์ดูแลผู้สูงอายุ,ดูแลปผู้ป่วยอัลไซเมอร์,ผู้ช่วยพยาบาล pn,อัมพาต คำแนะนำ,ศูนย์ดูแลคนชรา, เทคโนโลยีเพื่อผู้สูงอายุ , ทำไมต้องให้ nasogastric , นวัตกรรมเพื่อผู้สูงอายุ , หลักสูตรประกาศนียบัตรผู้ช่วยพยาบาล คือ , kwanmanas nursing , นวัตกรรม ออกกำลังกาย , สารอาหารที่ผู้สูงอายุต้องการ , ผู้สูงอายุ เบื่ออาหาร , อาการน็อคเบาหวาน,careadviser,careadvisor'},
    //   {name: 'description', content: 'นวัตกรรมดูแลผู้สูงอายุเพื่อค้นหาผู้ดูแลสำหรับผู้สูงอายุพ่อแม่ด้วยผู้ดูแลมืออาชีพไม่ว่าจะเป็นพยาบาลผู้ช่วยพยาบาล Caregiver ด้วยความร่วมมือของศูนย์ดูแลผู้สูงอายุ'},
    //   {name: 'robots', content: 'index, follow'},
    //   {httpEquiv:'content-language',content:'th'},
    //   {charset:'utf-8'},
    //   {name: 'google-site-verification', content: 'E-q--Fh9htOh8qvdmx90sL0Wosj5fxEzcP_f3MjZzuc'},
    // ]);

    // {name: 'google-site-verification', content: 'smAzho1duUVd2pm1b2XqRdNGKyV-Svy4KS5y82BHLqc'},
  }
  
}
