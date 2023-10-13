; import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HomeService } from '../../../../services/omgb/home.service';
import { LoaderService } from '../../../../services/loader.service';
import { from } from 'rxjs';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-emplyee-snapshot-calender',
  templateUrl: './emplyee-snapshot-calender.component.html',
  styleUrls: ['./emplyee-snapshot-calender.component.css']
})
export class EmplyeeSnapshotCalenderComponent implements OnInit {

  @Output() quarterChanged = new EventEmitter();
  @Input() page = "HOME"
  private quaters = [];
  private APIresult: any = [];
  private allYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
  private curentSelectedYears: any = [];
  private yearlist = [];
  private currentYear = 2022;
  private isLoading = true;
  quarterDetails: any;

  constructor(private _HomeService: HomeService, private _loader: LoaderService, private _session: SessionServiceService) {

  }

  showQuarters(isfirs) {
    let data = this.APIresult.find(y => y.year === this.currentYear);
    if (data !== undefined) {
      const quaters = data['quarterDetails'];
      let isCurrentQuarter = quaters.find(q => q.isCurrentQuarter === true);
      if (isCurrentQuarter === undefined) {
        quaters[0].isCCurrentQuarter = true;
      }
      let cdata = {};
      quaters.forEach(q => {
        q.active = false;
        if (q['isCurrentQuarter'] == true || q['isCCurrentQuarter'] == true) {
          q.active = true;
          cdata = q;
          this.currentYear = q.year;
          this._session.setCurrentQuarterDetails(q);
          this.makeYearlist(this.currentYear);
        }


      });
      this.quaters = quaters;
      if (isfirs) {
        this._HomeService.UIShouldUpadate({ type: 'QUARTR_DETAILS_INTIATED', page: this.page, data: cdata })
      } else {
        this._HomeService.UIShouldUpadate({ type: 'QUARTR_DETAILS_UPDATED', page: this.page, data: cdata })
      }

    } else {
      this.quaters = [];
    }

  }
  ngOnInit() {
    this.isLoading = true;
    this._HomeService.getQuarterDetails({}).subscribe(result => {
      this.APIresult = result;
      this.showQuarters(true);
      this.isLoading = false;
    });
  }
  onItemClick(data = {}, index = 0) {
    this.quarterChanged.emit(data);
    this.quaters.map(i => { i.active = false });
    this._session.setCurrentQuarterDetails(this.quaters[index]);
    this.quaters[index].active = true;
    this._HomeService.UIShouldUpadate({ type: 'QUARTR_DETAILS_UPDATED', page: this.page, data: data });
    this._HomeService.UIShouldUpadate({ type: 'GETQD', data: data })

  }
  yearClick(year, index) {
    if (year === '----') {
      return false;
    }
    index = this.allYears.findIndex(i => i === year);
    this.curentSelectedYears[0] = this.allYears[index - 2] || '----';
    this.curentSelectedYears[1] = this.allYears[index - 1] || '----';
    this.curentSelectedYears[2] = this.allYears[index] || '----';
    this.curentSelectedYears[3] = this.allYears[index + 1] || '----';
    this.curentSelectedYears[4] = this.allYears[index + 2] || '----';
    this.currentYear = year;
    this.showQuarters(false);
  }


  makeYearlist(year: any) {
    this.yearlist[2] = year;
    this.yearlist[3] = year + 1;
    this.yearlist[4] = year + 2;
    this.yearlist[1] = year - 1;
    this.yearlist[0] = year - 2;
    this.curentSelectedYears = this.yearlist;
  }
}
