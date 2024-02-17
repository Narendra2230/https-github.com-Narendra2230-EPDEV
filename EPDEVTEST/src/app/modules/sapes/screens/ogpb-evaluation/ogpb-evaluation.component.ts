import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/omgb/home.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from './../../../../services/data.service'
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { EncryptionService } from 'src/app/services/encryption.service';
@Component({
  selector: 'app-ogpb-evaluation',
  templateUrl: './ogpb-evaluation.component.html',
  styleUrls: ['./ogpb-evaluation.component.css']
})
export class OgpbEvaluationComponent implements OnInit {
  private subscription;
  submitDisable = false;
  private associateID = "S998989899";
  constructor(private _router: Router,
    private activateRoute: ActivatedRoute,
    private _homeServices: HomeService,
    private _dataService: DataService,
    private _alert: AlertMessageService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService,
    ) {

    this.associateID = this.encryptionService.deCryptEmpID(this.activateRoute.snapshot.params['id']);
  }
  ngOnInit() {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.subscription = this._homeServices.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'KPI_REQUITION_COMES') {
        this.valdate(false);
      }
    })

  }

  getRatingValues() {
    if (this.valdate(true)) {
      this.openDialog();
    }
  }
  valdate(showMsg) {
    const data = this._dataService.getPerformanceEvaluation();
    let KPISIST = data['pMSKpiLists_nonfixed'] || [];
    let Req = data['pMS_RequisitionKpiDetails'] || [];
    // let empRating = data['pMSRequisitionRatingDetails'] || [];
    let isValid = true;
    let isValid1 = true;
    let isValid2 = true;
    //raiseDiscussionStaus: "In Progress"
    KPISIST.forEach(e => {
      if (!e.mng_rate || e.mng_rate === "" ||
        e.mng_rate === null ||
         (e.raiseDiscussionStaus === 'In Progress' && e.raiseDiscussionEdited!==true)) isValid = false;
    });
    Req.forEach(e => {
      if (!e.mngr_cmt || e.mngr_cmt === "" || e.mngr_cmt === null) isValid1 = false;
    });

    if ((data['isUserManager'] && !data['isPersonal']) && (((data['ratingJustification'] == null && data['isPromotionRecommendation']==true) || (data['ratingJustification'] == "" && data['isPromotionRecommendation']==true)) || (data['isPromotionRecommendation'] == null) || (data['isRateYourAssociate'] == null || data['isRateYourAssociate'] == "") || (data['DiscussedDate']==null || data['discussedDate'] == ""))) { isValid2 = false;
    }
    let message = "";
    if (!isValid) message = message + " \n Please complete Rating of KPIs";
    if (!isValid1) message = message + " \n Please complete all the mandatory fields before you submit";
    if (!isValid2) message = message + " \n Please complete all the mandatory fields before you submit";

    if (showMsg) {
      if (!isValid || !isValid1 ||!isValid2) {
        this._alert.error(message)
        return false;
      }
    }
    if (isValid && isValid1 && isValid2) {
      setTimeout(() => {
        this.submitDisable = true;
      }, 10)
    } else {
      setTimeout(() => {
        this.submitDisable = false;
      }, 10)
    }
    return true;
  }
  goBack() {
    this._router.navigate(['my-team-sapes']);
  }


  openDialog() {
    const dialogRef = this.dialog.open(Confirompopup, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
   //   console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-confirompopup',
  templateUrl: './conformpopup.html',
  styleUrls: []
})


export class Confirompopup implements OnInit {
  constructor(private _dataService: DataService,
    private _homeServices: HomeService,
    private dialogRef: MatDialogRef<Confirompopup>) { }
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
