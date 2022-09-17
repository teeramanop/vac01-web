import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacMainComponent } from './vac/vac-main/vac-main.component';
import { VacUserProfileComponent } from './vac/vac-user-profile/vac-user-profile.component';
import { VacSubscribeMainComponent } from './vac/vac-subscribe-main/vac-subscribe-main.component';

import { UsermntComponent } from './vac/usermnt/usermnt.component';
import { CompanymntComponent } from './vac/companymnt/companymnt.component';


export const routes: Routes = [
  {
    path: '',
    component: VacMainComponent,
    data: {
      title: "Main"
    }
  },
  {
    path: 'userProfile',
    component: VacUserProfileComponent,
    data: {
      title: "ข้อมูลส่วนตัว"
    }
  },
  {
    path: 'usermnt',
    component: UsermntComponent,
    data: {
      title: "usermnt"
    }
  },
  {
    path: 'companymnt',
    component: CompanymntComponent,
    data: {
      title: "companymnt"
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
