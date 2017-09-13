import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MilliDateFormatter } from './milli-date-formatter';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
describe('MilliDateFormatter', () => {
  beforeEach(async(() => {
    TestBed
    .compileComponents();
  }));
  beforeEach(() => {
  });
  describe('formatDate', ()=>{
    it('should format milliseconds into an NgbDateStruct with correct date', () => {
      let currentDate = new Date();
      let millis = currentDate.getTime();
      let struct = MilliDateFormatter.formatDate(millis);
      expect(typeof struct.year).toBe('number');
      expect(typeof struct.day).toBe('number');
      expect(typeof struct.month).toBe('number');
      expect(struct.year).toEqual(currentDate.getUTCFullYear());
      expect(struct.day).toEqual(currentDate.getUTCDate());
      expect(struct.month).toEqual(currentDate.getUTCMonth() + 1);
    });
  });
  describe('parseDate', ()=>{
    it('should parse an NgbDateStruct into milliseconds', () => {
      let year = 2017;
      let day = 1;
      let month = 6;
      let millis = MilliDateFormatter.parseDate({
        year: year,
        day: day,
        month: month
      });
      let date = new Date(millis);
      expect(typeof millis).toBe('number');
      expect(date.getTime()).toBeCloseTo(millis);
    });
  });
});