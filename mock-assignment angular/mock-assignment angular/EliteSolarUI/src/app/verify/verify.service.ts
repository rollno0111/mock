import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(public http: HttpClient) { }
  getData(): Observable<any> {
    return <Observable<any>>this.http.get(`http://localhost:2040/test`);
  }

  loadDatabse(): Observable<any> {
    return <Observable<any>>this.http.get(`http://localhost:2040/setupdb`);
  }
}
