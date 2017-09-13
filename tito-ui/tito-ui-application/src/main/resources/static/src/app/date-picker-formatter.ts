import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
const MAXMONTH = 12;
const MINMONTH = 1;
const MINDAY = 1;
const MAXDAY = 31;
const MAXYEAR = 2099;
const MINYEAR = 2000;
export class DatePickerFormatter extends NgbDateParserFormatter {
  constructor(){
    super();
  }
  parse(date: string): NgbDateStruct{
    if(!date) return null;
    let dateSplit = date.split('/');
    let month = this.nullIfOutOfRange(Number(dateSplit[0]), MINMONTH, MAXMONTH);
    let day = this.nullIfOutOfRange(Number(dateSplit[1]), MINDAY, MAXDAY);
    let year = this.nullIfOutOfRange(Number(dateSplit[2]), MINYEAR, MAXYEAR);
    if(!(year&&month&&day)) return null;
    return {
      year: year,
      month: month,
      day: day
    };
  }
  private nullIfOutOfRange(num, min, max){
    return (num>max||num<min)?null:num;
  }
  format(dateStruct: NgbDateStruct): string{
    if(!dateStruct) return null;
    else{
      let month = String(dateStruct.month);
      let day = String(dateStruct.day);
      let year = String(dateStruct.year);

      return (month ?
                      ("00" + month).slice(-2)
                      : '00')
                  + '/' +
              (day ? 
                      ("00" + day).slice(-2)
                      : '00') 
              + '/' +
              (year ? year : '0000');
    }
  }
}
