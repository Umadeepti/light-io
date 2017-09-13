import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OppOperations } from './opp-operations';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SampleOpportunities } from "app/sample-opportunities";

describe('OppOperations', () => {
  var opp;
  var formattedOpp;
beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [
        OppOperations,
      ],
    })
    opp = JSON.parse(SampleOpportunities.OPPJSON);
    formattedOpp = JSON.parse(SampleOpportunities.FORMATTEDJSON);
});
describe("createUnformattedCopy", ()=>{
    it('should return data', () => {
        opp = OppOperations.createUnformattedCopy(opp);
        expect(opp).toBeTruthy();
    });
  });
describe("retrieveFormattedData", ()=>{
    it('should return data', () => {
        opp = OppOperations.retrieveFormattedData(opp);
        expect(opp).toBeTruthy();
    });
  });
 describe("populateEmpty", ()=>{
    it('should create all missing OppDetail descendent objects' +
        ' with null values in each field', () => {
        let nullOpp = OppOperations.populateEmpty(null);
        expect (
            (typeof nullOpp !== 'undefined' &&
            typeof nullOpp.summary !== 'undefined' && 
            typeof nullOpp.summary.account !== 'undefined' &&
            typeof nullOpp.summary.client !== 'undefined' &&
            typeof nullOpp.summary.subClient !== 'undefined' &&
            typeof nullOpp.details !== 'undefined' &&
            typeof nullOpp.landscape !== 'undefined')
        )
        .toBe(true);
    });
  });
  describe("formatData", ()=>{
    it('should format all date numbers to be NgbDateStructs if toOppDetail flag is false', () => {
        OppOperations.formatData(opp, false);
        let oppTimeLines = [opp.summary.proposalDueDate, opp.summary.estAwardDate];
        let dates = [opp.details.projectStartDate, opp.details.projectEndDate];
        for(let i = 0; i < oppTimeLines.length; i++){
            let isValid =                  
            ((oppTimeLines[i])&&(oppTimeLines[i].date === null) || 
            (!( isNaN(oppTimeLines[i].date.year) || 
               isNaN(oppTimeLines[i].date.month) || 
               isNaN(oppTimeLines[i].date.day)))); 
            expect(isValid).toBe(true);
        }
        for(let i = 0; i < dates.length; i++){
            let isValid = ((dates[i] === null) || 
            (!( isNaN(dates[i].year) || 
                isNaN(dates[i].month) || 
                isNaN(dates[i].day)))); 
            expect(isValid).toBe(true);
        }
    });
    it('should format all date NgbDateStructs to be numbers if toOppDetail flag is true', () => {
        OppOperations.formatData(formattedOpp, true);
        let opp = formattedOpp;
        let oppTimeLines = [opp.summary.proposalDueDate, opp.summary.estAwardDate];
        let dates = [opp.details.projectStartDate, opp.details.projectEndDate];
        for(let i = 0; i < oppTimeLines.length; i++){
            expect(oppTimeLines[i].date==null || !isNaN(Number(oppTimeLines[i].date))).toBe(true);
        }
        for(let i = 0; i < dates.length; i++){
            expect(dates[i]==null || !isNaN(Number(dates[i]))).toBe(true);
        }
    });
  });
  describe("deepCopy", ()=>{
    it('should create a perfect copy of an OppDetail object', () => {
        let newOpp = OppOperations.deepCopy(opp);
        let newOppJSON = JSON.stringify(newOpp);
        let oppJSON = JSON.stringify(opp);
        expect(newOppJSON).toEqual(oppJSON);
    });
  });
});
