import { ComponentFixture, TestBed, getTestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { AppComponent } from '../app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OppService } from './opp.service';
import { Opp } from '../opp';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';

describe('OppService', () => {
  var backend;
  var oppService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MockBackend,
        BaseRequestOptions,
        OppService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
    
    const testbed = getTestBed();  
    backend = testbed.get(MockBackend);  
    oppService = testbed.get(OppService);  
  });

  function checkEquality(opp1: Opp, opp2: Opp): boolean{
    return  (opp1.id === opp2.id &&
      opp1.name === opp2.name &&
      opp1.accountId === opp2.accountId &&
      opp1.accountName=== opp2.accountName &&
      opp1.managerId === opp2.managerId &&
      opp1.managerFirstName === opp2.managerFirstName &&
      opp1.managerLastName === opp2.managerLastName &&
      opp1.stage === opp2.stage
    );
  }
  
  it('should be able to be injected',
    inject([OppService], (service: OppService) => {
    expect(service).toBeDefined();
  }));
  describe('get', () => {
    let oppArray;
    beforeEach(()=>{
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
      name: "Opp2",
      accountId: 2,
      accountName: "business",
      managerId: 65,
      managerFirstName: "James",
      managerLastName: "Madison",
      stage: "active"
    },
    {
      id: 3,
      name: "Opp3",
      accountId: null,
      accountName: null,
      managerId: null,
      managerFirstName: null,
      managerLastName: null,
      stage: null
    }];
    });
    it('should get the full list of opportunities', fakeAsync(()=> {
      setup(backend, '/opps/home/', {body: oppArray, status: 200});
      var retrievedData;
      oppService.get().then(data => { 
        retrievedData = data 
      }); 
    
      tick();
      expect(retrievedData.length).toBe(oppArray.length);
      for(let i = 0, len = oppArray.length; i < len; i++){
        expect(checkEquality(oppArray[i], retrievedData[i])).toBe(true);
      }
    }));
    it('should return undefined in case of any error', fakeAsync(()=>{
        setup(backend, '/thisdoesnotexist/', {body: oppArray, status: 200});
        let retrievedData;
        oppService.get().then(data => { 
          retrievedData = data 
        }); 
        tick();
        expect(typeof retrievedData).toEqual('undefined');
    }));
  });

  describe('getById', () => {
    let expectedOpp;
    let id;
    beforeEach(()=>{
      expectedOpp = {
        id: 1,
        name: "Opp1",
        accountId: 21,
        accountName: "database",
        managerId: 2,
        managerFirstName: "John",
        managerLastName: "Johnson",
        stage: "completed"
      };
      id = 1;
    });
    it('should return a single opportunity', fakeAsync(() => {
      setup(backend, '/opps/detail/' + id, {body: expectedOpp, status: 200});
      let retrievedData;
      oppService.getById(id).then(data => {
        retrievedData = data;
      });

      tick();
      expect(retrievedData).toBe(expectedOpp);
    }));
    it('should return undefined in case of any error', fakeAsync(()=>{
        setup(backend, '/thisdoesnotexist/', {body: expectedOpp, status: 200});
        let retrievedData;
        oppService.getById(id).then(data => { 
          retrievedData = data 
        }); 
        tick();
        expect(typeof retrievedData).toEqual('undefined');
    }));
  });
  function setup(backend: MockBackend, urlExtension: string, options: any) {
      backend.connections.subscribe((mockConnection: MockConnection) => {
        if (mockConnection.request.url === 'http://localhost:8080' + urlExtension) {
          mockConnection.mockRespond(new Response(new ResponseOptions(options)));
        }
      });
    }
});  
