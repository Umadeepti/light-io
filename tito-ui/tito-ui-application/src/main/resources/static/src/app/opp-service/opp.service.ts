import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Opp } from '../opp';
import { OppBid } from "app/opp-view/opp-bid";
import { OppDetail } from 'app/common/opp-detail';
import { OppPursue } from "app/common/opp-pursue";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OppService {
  baseURL: string = `http://localhost:8080`;
  constructor( @Inject(Http) private http: Http) { }

  get(): Promise<Opp[]> {
    var url = this.baseURL + '/opps/home/';
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Opp[])
      .catch((error: any) => Promise.reject(error.message));
  }

  getById(id: any): Promise<OppDetail> {
    var url = this.baseURL + `/opps/detail/` + id;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }
  put(opp): Promise<OppDetail> {
    var url = this.baseURL + `/opps/detail/`;
    let headers= new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .put(url, JSON.stringify(opp), options)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }
  postBid(opp): Promise<OppBid> {
    var url = this.baseURL + `/opps/bid/`;
    let headers= new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(url, JSON.stringify(opp), options)
      .toPromise()
      .then(response => response.json() as OppBid)
      .catch((error: any) => Promise.reject(error.message));
  }
  create(opp): Promise<OppPursue> {
    var url = this.baseURL + `/opps/pursue/`;
    let headers= new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(url, opp, options)
      .toPromise()
      .then(response => response.json() as OppPursue)
      .catch((error: any) => Promise.reject(error.message));
  }

  createOppCompetitor(oppId, firmId): Promise<OppDetail> { 
    let url = 'http://localhost:8080/opps/detail/' + oppId 
      + '/competitor/' + firmId;
    return this.http.post(url, null, null)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }

  createOppPartner(oppId, firmId): Promise<OppDetail> {
    let url = 'http://localhost:8080/opps/detail/' + oppId 
      + '/partner/' + firmId;
    return this.http.post(url, null, null)
      .toPromise()
      .then(response => response.json() as OppDetail)
      .catch((error: any) => Promise.reject(error.message));
  }

  getPursueById(id: any): Promise<OppPursue> {
    var url = this.baseURL + `/opps/pursue/` + id;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as OppPursue)
      .catch((error: any) => Promise.reject(error.message));
  }
}
