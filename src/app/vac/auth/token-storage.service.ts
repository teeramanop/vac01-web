import { Injectable, Inject,PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { Customer } from '../share-class/Customer';
import {LOCAL_STORAGE,WINDOW} from '@ng-toolkit/universal'


const TOKEN_KEY = 'AuthToken';
const USERID_KEY = 'AuthUserid';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USER_PROFILE = 'userProfile';
const LANGUAGE_KEY = 'language';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  

  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.clear();
    }
    
  }

  public saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
    
  }

  public getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.sessionStorage.getItem(TOKEN_KEY);
    }
    
  }

  public saveUserProfile(userProfile: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(USER_PROFILE);
      window.sessionStorage.setItem(USER_PROFILE, userProfile);
    }
    
  }

  public getUserProfile(): string {
    if (isPlatformBrowser(this.platformId)) {
    return window.sessionStorage.getItem(USER_PROFILE);
    }
  }

  public saveUserid(userid: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(USERID_KEY);
      window.sessionStorage.setItem(USERID_KEY, userid);
    }
  }

  public saveUsername(username: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(USERNAME_KEY);
      window.sessionStorage.setItem(USERNAME_KEY, username);
    }
  }

  public saveLanguage(language: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(LANGUAGE_KEY);
      window.sessionStorage.setItem(LANGUAGE_KEY, language);
    }
  }
  public getLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.sessionStorage.getItem(LANGUAGE_KEY);
    }
  }

  public getUserid(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.sessionStorage.getItem(USERID_KEY);
    }
  }

  public getUsername(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.sessionStorage.getItem(USERNAME_KEY);
    }
  }

  public saveAuthorities(authorities: string[]) {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(AUTHORITIES_KEY);
      window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (isPlatformBrowser(this.platformId)) {
      if (window.sessionStorage.getItem(TOKEN_KEY)) {
        JSON.parse(window.sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
          this.roles.push(authority.authority);
        });
      }
    }

    return this.roles;
  }
}
