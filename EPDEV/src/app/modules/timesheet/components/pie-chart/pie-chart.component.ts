import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() chartData = { billablePercentage: 0, sharedPercentage: 0, pocPercentage: 0, nonBillablePercentage: 0 };
  @Input() mngrChartData = []
  @Input() type = "ASSOC";
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  // Highcharts.Options
  chartOptions = {}// required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

    if (this.type === 'MNGR') {
      this.chartOptions = this.getOptions(this.getMangetData());
    } else {
      this.chartOptions = this.getOptions(this.getAssocData());
    }
  }
  getAssocData() {
    return  [{
        name: 'Billable',
        y: this.chartData['billablePercentage'],
        sliced: true,
        selected: true,
        color: '#71c285'
      }, {
        name: 'Non-Billable',
        y: this.chartData['nonBillablePercentage'],
        color: '#4bbbdd'
      }, {
        name: 'Support Services',
        y: this.chartData['sharedPercentage'],
        color: '#556080'
      }, {
        name: 'IP/POC',
        y: this.chartData['pocPercentage'],
        color: '#bf8654'
      }];
  }
  getOptions(data) {
    return {
      chart: {
        width: 120,
        height: 120,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      }, title: {
        text: null
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      }, accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: false
        }
      },

      series: [{
        name: 'allocation', 
        colorByPoint: true,
        data
      }]
    }
  }
  getClassName(v){
  const colors = {"Billable":"#71c285","IP/POC":"#bf8654","Non-Billable":"#4bbbdd","Support Services":"#556080"}
  return colors[v]
  }
  
  getMangetData() {
    return this.mngrChartData.map(d => ({
      name: d.allocationStatus,
      y: d.pt,
      color: this.getClassName(d.allocationStatus)
    }));
  }

  ngOnInit() {
    if (this.type === 'MNGR') {
      console.log(this.getMangetData())
      this.chartOptions = this.getOptions(this.getMangetData());
    } else {
      this.chartOptions = this.getOptions(this.getAssocData());
    }
  }

}
