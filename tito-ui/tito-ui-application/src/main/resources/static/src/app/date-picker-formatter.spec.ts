import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerFormatter } from './date-picker-formatter';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
describe('DatePickerFormatter', () => {
  let formatter;
  beforeEach(() => {
    formatter = new DatePickerFormatter();
  });
  describe("parse", ()=>{
    it('should parse a formatted date into an NgbDateStruct with correct date', () => {
        let formattedDate = '07/18/2020';
        let struct: NgbDateStruct = formatter.parse(formattedDate);
        let splitDate = formattedDate.split('/');
        expect(Number(splitDate[0])).toEqual(struct.month);
        expect(Number(splitDate[1])).toEqual(struct.day);
        expect(Number(splitDate[2])).toEqual(struct.year);
    });
    it('should return null if date is invalid', () => {
        let date1 = '07/18/202000';
        let res1: NgbDateStruct = formatter.parse(date1);
        let date2 = '07/1qwefewqfewqf8/2040';
        let res2: NgbDateStruct = formatter.parse(date2);
        let date3 = '0217/18/2000';
        let res3: NgbDateStruct = formatter.parse(date3);
        expect(res1).toEqual(null);
        expect(res2).toEqual(null);
        expect(res3).toEqual(null);
    });
  });
  describe("format", ()=>{
    it('should format an NgbDateStruct into formatted date', () => {
        let struct: NgbDateStruct = {year: 2050, 
                                    month: 12,
                                    day: 5};
        let formattedDate = formatter.format(struct);
        let splitDate = formattedDate.split('/');
        expect(Number(splitDate[0])).toEqual(struct.month);
        expect(Number(splitDate[1])).toEqual(struct.day);
        expect(Number(splitDate[2])).toEqual(struct.year);
    });
    it('should return null if null or undefined is passed', () => {
        expect(formatter.format(null)).toEqual(null);
        expect(formatter.format(undefined)).toEqual(null);
    });
  });
});