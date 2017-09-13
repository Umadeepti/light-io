import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class PartnerService {

  constructor(@Inject(Http) private http: Http) { }

  	create(oppId, firmId): Promise<any> {
	  	let url = 'http://localhost:8080/opps/detail/' + oppId + '/partner/' + firmId;
	  	return this.http.post(url, null)
	  	.toPromise()
      	.then(response => response.json())
      	.catch((error: any) => Promise.reject(error.message));
	}

	delete(oppId, partnerId):Promise<any> {
	  	let url = 'http://localhost:8080/opps/detail/' + oppId + '/partner/' + partnerId;
	  	return this.http.delete(url)
	  	.toPromise()
      	.then(response => response.json())
      	.catch((error: any) => Promise.reject(error.message));
	}

}
