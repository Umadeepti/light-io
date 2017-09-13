import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { AppComponent } from '../app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OppTableComponent } from './opp-table.component';
import { Opp } from '../opp';
import { OppTableFormattedObject } from './opp-table-formatted-object';
import { RouterTestingModule } from "@angular/router/testing";
import { NavbarComponent } from '../navbar/navbar.component';

describe('OppTableComponent', () => {
  var oppTable;
  var oppArray;
  var formattedOppArray;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OppTableComponent,
        NavbarComponent,
        AppComponent
      ],
      imports: [
        Ng2SmartTableModule,
        NgbModule.forRoot(),
        RouterTestingModule
      ]
    })
      .compileComponents();
    let fixture = TestBed.createComponent(OppTableComponent);
    oppTable = fixture.debugElement.componentInstance;
    formattedOppArray = [{
      id: 1,
      account: "owqjenf",
      name: "ewonfwi",
      owner: "oienf",
      stage: "oqinf"
    },
      {
        id: 1,
        account: "owqjenf",
        name: "ewonfwi",
        owner: "oienf",
        stage: "oqinf"
      },
      {
        id: 1,
        account: "owqjenf",
        name: "ewonfwi",
        owner: "oienf",
        stage: "oqinf"
      }];
    oppArray = [{
      id: 1,
      name: "Opp1",
      accountId: 21,
      accountName: "database",
      managerId: 2,
      managerFirstName: "John",
      managerLastName: "Johnson",
      stage: "completed"
    },
    {
      id: 4,
      name: null,
      accountId: 2,
      accountName: "business",
      managerId: 65,
      managerFirstName: "James",
      managerLastName: "Madison",
      stage: "active"
    },
    {
      id: null,
      name: null,
      accountId: null,
      accountName: null,
      managerId: null,
      managerFirstName: null,
      managerLastName: null,
      stage: null
    }]
  });
  function checkEquality(opp1: OppTableFormattedObject, opp2: OppTableFormattedObject): boolean{
    return  (opp1.id === opp2.id &&
            opp1.account === opp2.account &&
            opp1.name === opp2.name &&
            opp1.owner === opp2.owner &&
            opp1.stage === opp2.stage);
  }
  it('should create the opp-table', () => {
    expect(oppTable).toBeTruthy();

  });

  it('should return array of OppTableFormattedObject from array of Opps', () => {
    oppTable.arrayToOppTableFormat(oppArray).forEach((el) => {
      expect(el).toEqual(jasmine.objectContaining({
        id: jasmine.any(Number),
        account: jasmine.any(String),
        name: jasmine.any(String),
        owner: jasmine.any(String),
        stage: jasmine.any(String)
      }));
    });
  });
  it('should remove empty elements from array of strings', () => {
    let array = ["", "bird", "", "a", "b", "", "", "hey", ""];
    expect(oppTable.removeEmpty(array)).toEqual(["bird", "a", "b", "hey"]);
  });
  it('should retrieve data from a get request and load it into the local data source', fakeAsync(() => {
    let getSpy = spyOn(oppTable.oppService, "get").and.callFake(() => {
      return Promise.resolve(oppArray);
    });
    let formatSpy = spyOn(oppTable, "arrayToOppTableFormat").and.returnValue(formattedOppArray);
    oppTable.ngOnInit();
    tick();
    expect(oppTable.oppService.get).toHaveBeenCalled();
    expect(oppTable.dataRetrieved).toBe(true);
    expect(oppTable.data.length).toEqual(formattedOppArray.length);
    for (let i = 0, len = formattedOppArray.length; i < len; i++) {
      expect(checkEquality(formattedOppArray[i], oppTable.data[i])).toBe(true);
    }
    expect(oppTable.data).toBe(formattedOppArray);
  }));
  it('should have no filters for an empty search query', fakeAsync(() => {
    oppTable.data = formattedOppArray;
    oppTable.onSearch('');
    tick();
    let elements = oppTable.source.getElements().then(data => oppTable.source.load(data));
    tick();
    for (let i = 0, len = elements.length; i < len; i++) {
      expect(checkEquality(elements[i], oppTable.data[i])).toBe(true);
    }
  }));
});
