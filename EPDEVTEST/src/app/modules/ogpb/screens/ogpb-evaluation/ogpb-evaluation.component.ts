import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/omgb/home.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from './../../../../services/data.service'
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
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
    private _session: SessionServiceService,
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
    // this.submitDisable = false;
    const data = this._dataService.getPerformanceEvaluation();
    const isPersonal = this._session.getStoreIsPersonal()['is-personal'];
    const btnStatusManage = this._session.getFinalRating()['final-rating'];
    console.log(btnStatusManage,'jhi')
    const isSelf = this._session.getStoreSelfDetails()['is-self'];
    let KPISIST = data['pMSKpiLists_nonfixed'] || [];
    let Req = data['pMS_RequisitionKpiDetails'] || [];
    // console.log(KPISIST, Req)
    let isValid = true;
    let isValid1 = true;
    KPISIST.forEach((e,i) => {
      if ((!e.isFixed && isPersonal) && (!(isSelf && isSelf[i]) || !(isSelf && isSelf[i].selfCMT || isSelf && isSelf[i].selfCMT === '') || (!(isSelf && isSelf[i]) || !(isSelf && isSelf[i].selfRating || isSelf && isSelf[i].selfRating === '')))) isValid = false;
    });

    let message = "";
    if (!isValid1) message = message + " \n Please complete manager rating & comments";
   // if (!isValid) message = message + " \n Please complete Rating of KPIs";
    //if (!isValid1) message = message + " \n Please complete the  Requisitions-2.";

    if (showMsg) {
      if ( !isValid1) {
       this._alert.error(message)
       return false;
      }
    }
    if ((!isPersonal && btnStatusManage && btnStatusManage.mgrSubmitBtnEnable && (!btnStatusManage.assSubmitBtnEnable))) {
      setTimeout(() => {
        this.submitDisable = false;
      }, 10)
    } else {
      setTimeout(() => {
        this.submitDisable = true;
      }, 10)
    }
    
    return true;
  }
  goBack() {
    this._router.navigate(['my-team-ogpb']);
  }


  openDialog() {
    const dialogRef = this.dialog.open(Confirompopup, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
