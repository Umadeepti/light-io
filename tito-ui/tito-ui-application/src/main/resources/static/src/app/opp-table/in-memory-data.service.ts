import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const opps = [
      {
        "name": "Database",
        "description": "This is a description",
        "account": {
            "name": "A",
            "description": "This is a description",
            "owner": {
          		"id": 1,
          		"lastName": "Johnson",
          		"firstName": "Michael"
            },
            "id": 1
        },
        "manager": {
	          "id": 1,
            "lastName": "LastName1",
            "firstName": "FirstName1"
        },
        "investment": "ewoin",
        "prime": false,
        "id": 3,
        "pricingStrategy": "qwef",
        "evaluationCriteria": "ewin",
        "projectStartDate": "ewijfn",
        "projectEndDate": "qieb",
        "awardType": "2foi",
        "winThemes": "ewf",
        "contractType": "ewfd",
        "valueAmount": 2,
        "govWinId": "wefwef",
        "fboLink": "wkfe"
      },
    ];
    return {opps};
  }
}
