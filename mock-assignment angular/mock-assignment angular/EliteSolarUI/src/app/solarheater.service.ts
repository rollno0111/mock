import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

class SolarHeater {
  name: string;
  img: string;
  desc: string;
}

@Injectable()
export class SolarheaterService {
  url: string = "http://localhost:2040/";

  // Inject neccessary dependencies
  constructor(private http: HttpClient) { }

  dashboardData(): Observable<SolarHeater[]> {
    return this.http.get(this.url + "dashboard") as Observable<SolarHeater[]>;
  }

  allocate(distributor, formData): Observable<any> {
    console.log(distributor, formData);

    return this.http.put(this.url + "allocate/" + distributor, formData) as Observable<any>
  }

  viewpurchase(): Observable<any> {
    return this.http.get(this.url + "solarheater") as Observable<any>
  }

}
