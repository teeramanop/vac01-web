import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_ID,PLATFORM_ID,Inject } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule} from '@angular/router';
import { routes } from './app-routing.module';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HttpClient } from '@angular/common/http'; 
import { CarouselModule } from 'ngx-owl-carousel-o';
import { httpInterceptorProviders } from './vac/auth/auth-interceptor';
import { AmazingTimePickerModule  } from 'amazing-time-picker';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {MatIconModule} from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CountToModule } from 'angular-count-to';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { FunctionUtil } from './vac/functionUtil';
import { CookieService } from 'ngx-cookie-service';
import { VacNavComponent } from './vac/vac-nav/vac-nav.component';
import { VacHeaderComponent } from './vac/vac-header/vac-header.component';
import { VacSubscribeComponent } from './vac/vac-subscribe/vac-subscribe.component';
import { VacFooterComponent } from './vac/vac-footer/vac-footer.component';
import { VacMenuComponent } from './vac/vac-menu/vac-menu.component';
import { VacMainComponent } from './vac/vac-main/vac-main.component';
import { VacModalLoginComponent } from './vac/vac-modal-login/vac-modal-login.component';
import { VacNavDropDownHomeComponent } from './vac/vac-nav-dropdown-home/vac-nav-dropdown-home.component';
import { VacUserProfileComponent } from './vac/vac-user-profile/vac-user-profile.component';
import { VacSubscribeMainComponent } from './vac/vac-subscribe-main/vac-subscribe-main.component';
import { NumberDirective } from './vac/pipe/numbers-only.directive';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import { UsermntComponent } from './vac/usermnt/usermnt.component';
import { CompanymntComponent } from './vac/companymnt/companymnt.component';



export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader (http, './assets/i18n/', '.json');
}

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: '103.86.48.68' //http://.48.68/   // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#292929c4'
    },
    button: {
      background: '#4fad8a',
    }
  },
  type:'info',
  elements:{
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message cookie-policy-margin">{{message}} </span>
    `,
  },
   content:{
    //message: '<div style="font-size: 13px;color:#fffff; font-family:none;" > เพื่อประสบการณ์ที่ดี เราใช้คุกกี้ในการเก็บข้อมูลการใช้งานของคุณ และคุณสามารถปิดการตั้งค่าการทำงานของคุกกี้ได้ <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="policy-cookie" target="_blank" style="font-size: 13px; font-family:none;">อ่านนโยบายความเป็นส่วนตัวและคุกกี้</a></div> ',
    message: '<div style="font-size: 13px;color:#fffff; font-family:none;" > เราใช้คุกกี้ในการเก็บข้อมูลการใช้งานของคุณ และคุณสามารถปิดการตั้งค่าการทำงานของคุกกี้ได้ </div> ',
    cookiePolicyHref: 'policy-cookie',
    dismiss: '<div style="color: #ffffff; font-family:none;">ยอมรับ</div>',
    policy: 'Cookie Policy'
   },
  theme: 'edgeless',
  // type: 'opt-out'

};

@NgModule({
  declarations: [
    AppComponent,
    VacNavComponent, 
    VacHeaderComponent, 
    VacSubscribeComponent, 
    VacFooterComponent, 
    VacMenuComponent,
    VacMainComponent,
    VacModalLoginComponent,
    VacNavDropDownHomeComponent,
    VacUserProfileComponent,
    VacSubscribeMainComponent,
    NumberDirective,
    UsermntComponent,
    CompanymntComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'vac-application' }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ShowHidePasswordModule,
    BrowserAnimationsModule,
    AmazingTimePickerModule,
    MatIconModule,
    Ng2PageScrollModule,
    ScrollToModule.forRoot(),
    NgbModule.forRoot(),
    HttpClientModule,
    CarouselModule,
    // asdasdasd
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    RouterModule.forRoot(routes, { useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    TranslateModule.forRoot({
      loader: { 
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory ,
        deps: [HttpClient]

      }
      }),
    MatPasswordStrengthModule,
    CommonModule,
    MatIconModule,
    ShowHidePasswordModule,
    SwiperModule,
    CarouselModule,
    CountToModule,
    FormsModule,
    ArchwizardModule,
    MatPasswordStrengthModule,
    AngularFontAwesomeModule,

    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,

    NgcCookieConsentModule.forRoot(cookieConfig),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgbModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    httpInterceptorProviders,
    NgbActiveModal,
    FunctionUtil,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(
    @Inject(PLATFORM_ID) private platformId:Object,
    @Inject(APP_ID) private appId:string
  ){
    const platform = isPlatformBrowser(platformId)?'in the browser' : 'on the server';
    console.log('Running'+platform+' : '+appId); 
  }
}
