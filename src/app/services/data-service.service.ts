import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private GLOBAL_DATA_URL = `https://raw.githubusercontent.com/PeterPan0829/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-16-2020.csv`;

  constructor(private http: HttpClient) { }


  getGlobalData() {
    return this.http.get(this.GLOBAL_DATA_URL, { responseType: 'text' }).pipe(
      map(data => {
        console.log(data, '-----------data');
        return data;
      })
    );
  }
}
