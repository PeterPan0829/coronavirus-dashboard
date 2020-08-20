import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  data: GlobalDataSummary[];
  countries: string[] = [];

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country);
      });
    });
  }

  updateValuesHandler(country: string) {
    console.log(country, `----------------updateValuesHandler()'s country`);
    this.data.forEach(cs => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
        this.totalConfirmed = cs.confirmed;
      }
    });

    // this.selectedCountryData = this.dateWiseData[country]
    // // console.log(this.selectedCountryData);
    // this.updateChart();

  }

}
