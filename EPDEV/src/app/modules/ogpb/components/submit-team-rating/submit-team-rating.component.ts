import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/omgb/home.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-submit-team-rating',
  templateUrl: './submit-team-rating.component.html',
  styleUrls: ['./submit-team-rating.component.css']
})
export class SubmitTeamRatingComponent implements OnInit, OnDestroy {

  private enableCTA = false;
  private title="ASSIGN MEASURES";
  private subscription;
  constructor(private dialog: MatDialog, private _service: HomeService,
    private _alert: AlertMessageService,
    private _dataService: DataService) { }
  teamRateConform() {
    // if (this.valdate()) {
    //   this.openDialog();
    // }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this._service.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === "EMP_CHECK") {
        this.enableCTA = data['data']['enableCTA']
      }
      if (data['data']['title'] !== "null" && data['data']['title'] !== undefined) {
        this.title = data['data']['title']
      }
    })
  }
  assinGoals() {
    this._service.UIShouldUpadate({ type: 'ASSIGN_GOALS' })
  }
  valdate() {
    const data = this._dataService.getPerformanceEvaluation();
    let KPISIST = data['pMSKpiLists_nonfixed'] || [];
    let Req = data['pMS_RequisitionKpiDetails'] || [];
    let isValid = true;
    let isValid1 = true;
    KPISIST.forEach(e => {
  //    if (!e.mng_rate || e.mng_rate === "") isValid = false;
    });
    Req.forEach(e => {
      if (!e.mngr_cmt || e.mngr_cmt === "") isValid1 = false;
    });
    let message = "";
    if (!isValid) message = message + " \n Please complete Rating of KPIs.";
    if (!isValid1) message = message + " \n Please complete Requisitions comments.";



    if (!isValid || !isValid1) {
      this._alert.error(message)
      return false;
    }
    return true;
  }

  openDialog() {
    const dialogRef = this.dialog.open(Teamratepopup);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-confirm',
  templateUrl: './conform.html',
  styleUrls: []
})


export class Teamratepopup implements OnInit {

  //constructor(private _dataService: DataService) { }

  ngOnInit() {
  }


}

