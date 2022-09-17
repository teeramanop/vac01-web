export class FunctionUtil{
    getSysdate(){
        var today = new Date();
        var dd = this.getPad(today.getDate().toString(), 2);
        var mm = this.getPad((today.getMonth()+1).toString(), 2);
        var yyyy = today.getFullYear();
        var sysdate = '23/08/2019';
        let newDate = new Date(sysdate);
        return newDate;
    }

    getPad(str, max){
        return str.lenght < max ? this.getPad("0"+str,max) : str;
    }

    calAge(dob) { 
        var today = new Date(),
            result = { 
              years: 0, 
              months: 0, 
              days: 0, 
              toString: function() {
                  var age = '';
                  if(!isNaN(this.years) && !isNaN(this.months) && !isNaN(this.days)){
                    if(this.years > 0){
                        age = this.years;
                    }else if(this.months > 0){
                        age = "0";
                    }else{
                        age = "0";
                    }
                  }
                  return age;
              }
            };
            
        result.months = 
          ((today.getFullYear() * 12) + (today.getMonth() + 1))
          - ((dob.getFullYear() * 12) + (dob.getMonth() + 1));
          
        if (0 > (result.days = today.getDate() - dob.getDate())) {
            var y = today.getFullYear(), m = today.getMonth();
            m = (--m < 0) ? 11 : m;
            result.days += 
              [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m] 
                + (((1 == m) && ((y % 4) == 0) && (((y % 100) > 0) || ((y % 400) == 0))) 
                    ? 1 : 0);
            --result.months;
        }
        result.years = (result.months - (result.months % 12)) / 12;
        result.months = (result.months % 12);
        return result;
    }
    
    validateNumberOnnly(num){
        var result: boolean = true;
        const pattern = /^\d+$/;
        if(!pattern.test(num)){
            result = false;
        }
        return result;
    }
}