import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class CompetitorService {

  	constructor(@Inject(Http) private http: Http) { }

  	create(oppId, firmId): Promise<any> {
	  	let url = 'http://localhost:8080/opps/detail/' + oppId + '/competitor/' + firmId;
	  	return this.http.post(url, null)
	  	.toPromise()
      	.then(response => response.json())
      	.catch((error: any) => Promise.reject(error.message));
	}

	delete(oppId, competitorId):Promise<any> {
	  	let url = 'http://localhost:8080/opps/detail/' + oppId + '/competitor/' + competitorId;
	  	return this.http.delete(url)
	  	.toPromise()
      	.then(response => response.json())
      	.catch((error: any) => Promise.reject(error.message));
	}

}
