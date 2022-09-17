import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class UtilService {

    constructor() {
    }
  
      public formatNum(num) {
          num = num.toString().replace(/\$|\,/g,'');
          if(isNaN(num))
              num = "0";
              var sign = (num == (num = Math.abs(num)));
              num = Math.floor(num*100+0.50000000001);
              var cents: any = num%100;
              num = Math.floor(num/100).toString();
              if(cents<10)
                 cents = '0' + cents;
              for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
                  num = num.substring(0,num.length-(4*i+3))+','+
                  num.substring(num.length-(4*i+3));
              return (((sign)?'':'-') + num + '.' + cents);
      }
  
      public formatInt(num) {
          num = num.toString().replace(/\$|\,/g,'');
          if(isNaN(num))
              num = "0";
              var sign = (num == (num = Math.abs(num)));
              num = Math.floor(num*100+0.50000000001);
              var cents: any = num%100;
              num = Math.floor(num/100).toString();
              if(cents<10)
                  cents = "0" + cents;
              for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
                  num = num.substring(0,num.length-(4*i+3))+','+
                  num.substring(num.length-(4*i+3));
              return (((sign)?'':'-') + num);
      }
      
      public removecomma(s) {
         var r = "";
         var i;
         for (i = 0; i < s.length; i++) {
              if (s.substr(i,1) != ',') {
                  r = r + s.substr(i,1);
              }
         }
         return r;
  }
  
      public daysdiff(date1, date2) {
  
      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24
  
      // Convert both dates to milliseconds
      //var date1_ms = date1.getTime()
      //var date2_ms = date2.getTime()
      var date1_ms = new Date(date1).getTime()
      var date2_ms = new Date(date2).getTime()
  
      // Calculate the difference in milliseconds
      var difference_ms = Math.abs(date1_ms - date2_ms)
  
      // Convert back to days and return
      return Math.round(difference_ms/ONE_DAY)
  
  }
  
      public TodayDate() {
          var now = new Date();
          var day = ("0" + now.getDate()).slice(-2);
          var month = ("0" + (now.getMonth() + 1)).slice(-2);
          var today = now.getFullYear() + "-" + (month) + "-" + (day); 
          return today;
      }
       
      public getCurrentTimeUTC() {
        //RETURN:
        //      = number of milliseconds between current UTC time and midnight of January 1, 1970
        var tmLoc = new Date();
        //The offset is in minutes -- convert it to ms
        //return tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000;
        return new Date(tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000);
      }
  
      public getCurrentTimeThailand() {
        const date = new Date()
        //return this.convertTZ(date, "Asia/Jakarta") // current date-time in jakarta.
        return this.convertToThailandTime(date) // current date-time in jakarta.
      }
  
      public convertToThailandTime(date) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));   
      }
        
      public dateToString(date: Date): string {
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var dateString = date.getFullYear() + "-" + (month) + "-" + (day); 
        return dateString;
    }
     
    public cnvDDMMYYYY(YYYYMMDD: string): string {
        if (YYYYMMDD==''){
            return "";
        }
	    if (YYYYMMDD.length<10) {
            return YYYYMMDD;	
	    }
        var DDMMYYYY = '';
        DDMMYYYY = YYYYMMDD.substring(8,10) + "-" + YYYYMMDD.substring(5,7) + "-" + YYYYMMDD.substring(0,4);		
        return DDMMYYYY;
   }

    public StrRepeat(s: string, cnt): string {
        var ss="";
        for (var i=0; i<cnt; i++){
            ss += s
        }
        return ss;
    }

    public StrPadLeft(s: string, padChar: string, cnt): string {
        s = this.StrRepeat(padChar,cnt) + s;
        s = s.substring(s.length-cnt);
        return s;
    }

    getTimeDiff(dateFm, dateTo) {
        if (dateTo<dateFm){
          dateTo=dateFm;
        }
        var elapsed = dateTo - dateFm;
        var difference = new Date(elapsed);
        var diff_days = difference.getDay()-4; // ไม่รู้ว่าทำไมต้องลบด้วย 4
        var diff_hours = difference.getHours() - 7; //GMT + 7
        if (diff_hours<0){// กรณีที่ -7 ข้างบน แล้วติดลบ
          diff_hours+=24;
          diff_days-=1
        }
        var diff_mins = difference.getMinutes();
        var diff_seconds = difference.getSeconds();
        var d = "";
        if (diff_days>0){
          d = diff_days + " วัน ";
        }

        d = d + " " + this.StrPadLeft(diff_hours.toString(),"0",2) 
          + ":" + this.StrPadLeft(diff_mins.toString(),"0",2) 
          + ":" + this.StrPadLeft(diff_seconds.toString(),"0",2);
        d = d.trim();
        return d;
      } 

      public IsNewBrowser(): boolean {
      // browser version
      var navUserAgent = navigator.userAgent;
      var browserName  = navigator.appName;
      var browserVersion  = ''+parseFloat(navigator.appVersion); 
      var majorVersion = parseInt(navigator.appVersion,10);
      var tempNameOffset,tempVersionOffset,tempVersion;
      
      
      if ((tempVersionOffset=navUserAgent.indexOf("Opera"))!=-1) {
       browserName = "Opera";
       browserVersion = navUserAgent.substring(tempVersionOffset+6);
       if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1) 
         browserVersion = navUserAgent.substring(tempVersionOffset+8);
      } else if ((tempVersionOffset=navUserAgent.indexOf("MSIE"))!=-1) {
       browserName = "Microsoft Internet Explorer";
       browserVersion = navUserAgent.substring(tempVersionOffset+5);
      } else if ((tempVersionOffset=navUserAgent.indexOf("Chrome"))!=-1) {
       browserName = "Chrome";
       browserVersion = navUserAgent.substring(tempVersionOffset+7);
      } else if ((tempVersionOffset=navUserAgent.indexOf("Safari"))!=-1) {
       browserName = "Safari";
       browserVersion = navUserAgent.substring(tempVersionOffset+7);
       if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1) 
         browserVersion = navUserAgent.substring(tempVersionOffset+8);
      } else if ((tempVersionOffset=navUserAgent.indexOf("Firefox"))!=-1) {
       browserName = "Firefox";
       browserVersion = navUserAgent.substring(tempVersionOffset+8);
      } else if ( (tempNameOffset=navUserAgent.lastIndexOf(' ')+1) < (tempVersionOffset=navUserAgent.lastIndexOf('/')) ) {
       browserName = navUserAgent.substring(tempNameOffset,tempVersionOffset);
       browserVersion = navUserAgent.substring(tempVersionOffset+1);
       if (browserName.toLowerCase()==browserName.toUpperCase()) {
        browserName = navigator.appName;
       }
      }
      
      // trim version
      if ((tempVersion=browserVersion.indexOf(";"))!=-1)
         browserVersion=browserVersion.substring(0,tempVersion);
      if ((tempVersion=browserVersion.indexOf(" "))!=-1)
         browserVersion=browserVersion.substring(0,tempVersion);

      //alert("BrowserName = " + browserName + "\n" + "Version = " + browserVersion);

      if (browserName=="Safari") {
        if (browserVersion<'14') {
          return false;
        }
      }
    //   if (browserName=="Chrome") {
    //     if (browserVersion<'86') {
    //       return false;
    //     }
    //   }
          return true;
      }     
      
      public permute( a: string[], k,  ss: string[]) 
      {
          if (k == a.length) 
          {
              var s = "";
              for (var i = 0; i < a.length; i++) 
              {
                 s += a[i]; // System.out.print(" [" + a[i] + "] ");
              }
              ss.push(s);
          } 
          else 
          {
              for (i = k; i < a.length; i++) 
              {
                  var temp = a[k];
                  a[k] = a[i];
                  a[i] = temp;
   
                  this.permute(a, k + 1, ss);
   
                  temp = a[k];
                  a[k] = a[i];
                  a[i] = temp;
              }
          }
      }

}
  