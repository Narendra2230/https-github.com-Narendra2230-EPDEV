import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './../../../../services/data.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeService } from './../../../../services/omgb/home.service'
import { SessionServiceService } from './../../../../services/session/session-service.service';
import { AlertMessageService } from './../../../../services/alert-message.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  private KPIData = {};
  private isCurrentQuarter = false;
  private subscription;
  private ogpbEligibility = false;
  private checkisTrue;
  private submitDisable = false;
  constructor(private _dataService: DataService,
    private dialog: MatDialog,
    private _homeServices: HomeService,
    private _session: SessionServiceService,
    private _alert: AlertMessageService) {

  }
  checkIsQurterDetails() {
    let qd = this._session.getCurrentQuarterDetails();
    if (qd !== null) {
      this.isCurrentQuarter = qd['isCurrentQuarter'];
    }
  }

  ngOnInit() {
    this.subscription = this._homeServices.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'QUARTR_DETAILS_UPDATED') {
        this.checkIsQurterDetails();
      } else if (data['type'] === 'QUARTR_DETAILS_INTIATED') {
        this.checkIsQurterDetails();
      } else if (data['type'] === 'KPI_REQUITION_COMES') {
        this.valdate(false);
      }
    })

  
      var get_C_quater = this._session.getCurrentQuarterDetails();
      this.checkisTrue = get_C_quater && get_C_quater.enableForSubmission; 
     // console.log( this); 
      //return this.checkisTrue;
      this._homeServices.getAssociateDetails(null).subscribe(data => {
        this.ogpbEligibility = data && data['ogpbEligibility'];
       // console.log(this.ogpbEligibility)
      })


   
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  goToHome(){
    // window.location.href = 'https://ep.suneratech.com/Home/Dashboard'
    window.location.href = 'http://epstaging.suneratech.com/Home/Dashboard' 
    }

  getKPIDetails(payload) {
    this._homeServices.getPMSSelfEvaluationList(payload).subscribe(r => {
      this.KPIData = r;
      console.log(this.KPIData);
    });
  }


  

 //console.log('checkisTrue==>',this._session.getCurrentQuarterDetails());

  getRatingValues() {
    let isValid = this.valdate(true);
    if (isValid) {
      this.openDialog()
    }
    //console.log() Do you want to submit Ratings?
  }
  valdate(showMsg) {
    // this.submitDisable = false;
    const data = this._dataService.getPerformanceEvaluation();
    let KPISIST = data['pMSKpiLists_nonfixed'] || [];
    let Req = data['pMS_RequisitionKpiDetails'] || [];
    // console.log(KPISIST, Req)
    let isValid = true;
    let isValid1 = true;
    KPISIST.forEach(e => {
      if (!e.self_rate || e.self_rate === "" || e.self_rate === null) isValid = false;
    });
    Req.forEach(e => {
      if ((!e.managerKPI) && (!e.ass_cmt || e.ass_cmt === "" || e.ass_cmt === null)) isValid1 = false;
    });
    let message = "";
    if (!isValid) message = message + " \n Please complete Rating of KPIs.";
    if (!isValid1) message = message + " \n Please complete self apprisel associate inputs.";

    // console.log(isValid, isValid1)

    if (showMsg) {
      if (!isValid || !isValid1) {
        this._alert.error(message)
        return false;
      }
    }
    if (isValid && isValid1) {
      setTimeout(() => {
        this.submitDisable = true;
      }, 10);

    } else {
      setTimeout(() => {
        this.submitDisable = false;
      }, 10);

    }
    return true;
  }

  openDialog() {
    const dialogRef = this.dialog.open(Confirmomponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.html',
  styleUrls: []
})


export class Confirmomponent implements OnInit {
  constructor(private _dataService: DataService,
    private _homeServices: HomeService,
    private dialogRef: MatDialogRef<Confirmomponent>) { }
  ngOnInit() {
  }

  closRatingpopup() {
    this.dialogRef.close();
  }

  sendKpi() {
    this._homeServices.UIShouldUpadate({ type: 'sendKpidata' });
    this.dialogRef.close();
  }
}



