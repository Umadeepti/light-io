/*formats dates coming to and from backend*/
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
export class MilliDateFormatter {
  static formatDate(millis: number): NgbDateStruct{
        if(!millis || millis < 0) return null;
        else{
            var date = new Date(millis)
            return {
                  year: date.getUTCFullYear(),
                  month: date.getUTCMonth() + 1,
                  day: date.getUTCDate()
            }
        }
  }
  static parseDate(formattedDate: NgbDateStruct): number{
        if(!formattedDate ) return null;
        var date = new Date((formattedDate.month + "/" + 
        formattedDate.day + "/" + formattedDate.year + " 00:00:00"));
        return date.getTime();
  }
}
