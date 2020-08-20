import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { map } from 'rxjs/operators';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';

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
  selectedCountryData: DateWiseData[];
  countries: string[] = [];
  dateWiseData;
  loading = true;
  options: {
    height: 500,
    animation: {
      duration: 1000,
      easing: 'out',
    },
  };

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {

    merge(
      this.service.getDateWiseData().pipe(
        map(result => {
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(map(result => {
        this.data = result;
        this.data.forEach(cs => {
          this.countries.push(cs.country);
        });
      }))
    ).subscribe(
      {
        complete: () => {
          this.updateValues('India');
          this.loading = false;
        }
      }
    );



  }

  updateChart() {
    let dataTable = [];
    dataTable.push(["Date", 'Cases']);
    this.selectedCountryData.forEach(cs => {
      dataTable.push([cs.date, cs.cases]);
    });


  }

  updateValues(country: string) {
    // console.log(country);
    this.data.forEach(cs => {
      if (cs.country == country) {
        this.totalActive = cs.active;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
        this.totalConfirmed = cs.confirmed;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
    // console.log(this.selectedCountryData);
    this.updateChart();
  }

}
