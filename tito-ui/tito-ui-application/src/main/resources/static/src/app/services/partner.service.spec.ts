import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';

import { PartnerService } from './partner.service';

describe('PartnerService', () => {
	var backend;
  	var oppService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      	MockBackend,
        BaseRequestOptions,
      	PartnerService,
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
    oppService = testbed.get(PartnerService);

  });

  it('should be created', inject([PartnerService], (service: PartnerService) => {
    expect(service).toBeTruthy();
  }));
  function setup(backend: MockBackend, urlExtension: string, options: any) {
      backend.connections.subscribe((mockConnection: MockConnection) => {
        if (mockConnection.request.url === 'http://localhost:8080' + urlExtension) {
          mockConnection.mockRespond(new Response(new ResponseOptions(options)));
        }
      });
    }
});
