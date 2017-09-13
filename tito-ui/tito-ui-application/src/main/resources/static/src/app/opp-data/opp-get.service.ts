import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Opp } from '../opp';
import { OppDetail } from '../common/opp-detail';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { OppPursue } from "app/common/opp-pursue";

@Injectable()
export class OppGetService {
  constructor( @Inject(Http) private http: Http) { }

  get(): Promise<Opp[]> {
    var url = `http://localhost:8080/opps/home/`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Opp[])
      //.catch((error: any) => Promise.reject(error.message));
  }

  getById(id): Promise<OppDetail> {
    var url = `http://localhost:8080/opps/detail/` + id;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }

  create(opp): Promise<OppPursue> {
    var url = `http://localhost:8080/opps/pursue/`;
    let headers= new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(url, opp, options)
      .toPromise()
      .then(response => response.json() as OppPursue)
      .catch((error: any) => Promise.reject(error.message));
  }

  update(opp): Promise<OppDetail> {
    var url = `http://localhost:8080/opps/detail/`;
    let headers= new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .put(url, JSON.stringify(opp), options)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }

  createOppCapture(oppId): Promise<OppDetail> {
    let url = 'http://localhost:8080/opps/detail/' + oppId 
      + '/event/' ;
    let headers= new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(url, oppId, options)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }
    deleteOppCapture(oppId, capId): Promise<OppDetail> {
    let url = 'http://localhost:8080/opps/detail/' + oppId 
      + '/event/'+ capId ;
    let headers= new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .delete(url, null)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }
}
