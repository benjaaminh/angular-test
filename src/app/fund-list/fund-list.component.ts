import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts'

@Component({
  selector: 'app-fund-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxChartsModule],
  templateUrl: './fund-list.component.html',
})
export class FundListComponent implements OnInit {

  ngOnInit(): void {
    this.fetchData();
  }
  constructor(private httpClient: HttpClient) { }
  data: any[] = [];
  chartData: any[] = [];
  colorScheme = 'cool';
  gradient = false;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Change (%)';

  fetchData() {
    this.httpClient
      .get('https://ivarpivar.netlify.app/api')
      .subscribe((response: any) => {
        //response array is one element with data and status, we want to fetch data since it contains the relevant info
        if (response && response.length > 0 && response[0].data && response[0].data.length > 0) {
          this.data = response[0].data;
          this.processData(); //process the data we retrieved
        } else {
          console.error('Invalid API response format');
        }
      });
  }
  processData() {
    this.chartData = this.data //chartdata will be used for the chart
      .filter(fund => fund.fundName && //only want funds that are defined
        fund.change1m !== null && fund.change1m !== undefined &&
        fund.change3m !== null && fund.change3m !== undefined &&
        fund.change1y !== null && fund.change3y !== undefined)
        .map(fund => {
          return {
            name: fund.fundName,
            series: [ //array of each data point which will display change in that period of time
              {
                name: 'Change 1m',
                value: fund.change1m
              },
              {
                name: 'Change 3m',
                value: fund.change3m
              },
              {
                name: 'Change 3y',
                value: fund.change3y
              }
            ]
          };
        });
    }
  }