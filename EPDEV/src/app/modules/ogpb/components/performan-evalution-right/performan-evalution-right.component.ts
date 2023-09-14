import { Component, OnInit, OnDestroy, Input, OnChanges, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from './../../../../services/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeService } from './../../../../services/omgb/home.service';
import { SessionServiceService } from './../../../../services/session/session-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageService } from 'src/app/services/alert-message.service';


@Component({
  selector: 'app-performan-evalution-right',
  templateUrl: './performan-evalution-right.component.html',
  styleUrls: ['./performan-evalution-right.component.css']
})
export class PerformanEvalutionRightComponent implements OnInit, OnChanges, OnDestroy {
  private currentFormData = {};
  private pMSKpiLists = [];
  private pMSFInalRating = {};
  private isCurrentQuarter = false;
  private managerRating:any =0;
  private managerRatingVal:any = "";
  private userRatingVal:any = "";
  private associateCMT:any = "";
  private maCMT:any = "";
  private selfRating:any =0;
  selfRatingWeightage:any;
  private managerOptionSelected:any = '';
  private selfOptionSelected:any = '';
  private managerOption = false;
  private selfOption = false;
  private selfRatingSelection: any;
  private selfDetails = [];
  private managerDetails = [];
  @Input() KPIData;
  @Input() isPersonal;
  @Input() associateID = null;
  private isAPILoad = false;
  private subscription;
  @ViewChild('selfMeasureWeight', { static: false}) divView: ElementRef;
  @ViewChild('managerMeasureWeight', { static: false}) pView: ElementRef;
  @ViewChild('selfCMT', { static: false}) cmtView: ElementRef;
  @ViewChild('managerCMT', { static: false}) managerView: ElementRef;
  constructor(private _dataService: DataService, private dialog: MatDialog,
    private _homeService: HomeService, @Inject(MatDialog) public data: any,
    private _session: SessionServiceService, private _alert: AlertMessageService) { }

  ngOnInit() {
    let qd = this._session.getCurrentQuarterDetails();
    if (qd !== null) {
      this.isCurrentQuarter = qd['isCurrentQuarter'];
    }
    this.currentFormData = this._dataService.getPerformanceEvaluation();
    this._dataService.getFormChangeEmitter().subscribe(d => {
      this.currentFormData = this._dataService.getPerformanceEvaluation();
    })

    this.subscription = this._homeService.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'CLEAR_DATA') {
      }
      else if (data['type'] === 'sendKpidata') {
        this.savekpiData();
      }
    });
    this._session.storeIsPersonal({'is-personal': this.isPersonal});
    //this.selfDetails = [];
    // this.managerDetails = {};
    // this._session.storeManagerDetails({'is-manager': this.managerDetails});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges() {
    this.pMSKpiLists = (this.KPIData['pMSKpiLists'] || []).filter(l => l['isFixed'] !== true);
    this.pMSKpiLists.forEach(e => {
      e.mng_rate = e.managerScore
      e.self_rate = e.associateScore;
      e.self_rate_disable = (e.self_rate !== "" && e.self_rate !== null) ? true : false;
      e.mng_rate_disable = (e.mng_rate !== "" && e.mng_rate !== null) ? true : false;
    });
    let count = (this.KPIData['pMSKpiLists'] || []).filter(l => l['isFixed'] === false);
    this.isPersonal ? (this.selfDetails = count) : (this.managerDetails = count);
    this._session.storeSelfDetails({'is-self': this.selfDetails});
    this._session.storeSelfDetails({'is-manager': this.managerDetails});
    let pEdata = this._dataService.getPerformanceEvaluation();
    console.log(pEdata,'acc');
    this.pMSFInalRating = this.KPIData['pMSFInalRating'] || {};
    pEdata['pMSKpiLists_nonfixed'] = this.pMSKpiLists;
    this._dataService.setPerformanceEvaluation(pEdata);
    this._homeService.UIShouldUpadate({ type: 'KPI_REQUITION_COMES', data: {} });
    this.SelfcalculatePer();
    this.MngcalculatePer();
    this._session.storeIsPersonal({'is-personal': this.isPersonal});
  }
  getContainerWidth() {
    if (this.pMSKpiLists.length === 1) {
      return { 'width': "50%" };
    } else if (this.pMSKpiLists.length === 2) {
      return { 'width': "49%" };
    } else if (this.pMSKpiLists.length === 3) {
      return { 'width': "32.333%" };
    } else if (this.pMSKpiLists.length === 4) {
      return { 'width': "24.00%" };
    } else if (this.pMSKpiLists.length === 5) {
      return { 'width': "20.00%" };
    } else if (this.pMSKpiLists.length === 6) {
      return { 'width': "15.00%" };
    } else {
      return {};
    }
  }
  managerRatingOptions(i,option) {
    if(!isNaN(Number(option.target.value))) {
      this.managerRatingVal = option.target[option.target.selectedIndex].innerHTML;
      this.managerOption = true;
      this.managerDetails[i]['managerRating'] = this.managerRatingVal;
      this._session.storeManagerDetails({'is-manager': this.managerDetails});
    }
  }
  selfRatingOptions(i,option) {
    if(!isNaN(Number(option.target.value))) {
      this.userRatingVal = option.target[option.target.selectedIndex].innerHTML;
      this.selfRatingSelection = this.userRatingVal;
      this.selfOption = true;
      this.selfDetails[i]['selfRating'] = this.userRatingVal;
      this._session.storeSelfDetails({'is-self': this.selfDetails});
    }
  }
  associateCMTChange(i,e) {
    this.cmtView.nativeElement.innerHTML = e.target.value.trim();
    this.selfDetails[i]['selfCMT']  = e.target.value.trim();
    this._session.storeSelfDetails({'is-self': this.selfDetails});
  }
  
  maCMTChange(i,e) {
    this.managerView.nativeElement.innerHTML = e.target.value.trim();
    this.managerDetails[i]['managerCMT'] = e.target.value.trim();
    this._session.storeManagerDetails({'is-manager': this.managerDetails});
  }
  commentPopup(kpidata) {
    this.openDialog(kpidata);
  }

  riceDiscussition(kp) {
    this.openriceDiscussition(kp);
  }

  savekpiData() {
    this.isAPILoad = true;
    let kpiDaa = this._dataService.getPerformanceEvaluation();
    let uid = this.isPersonal ? this._session.getUserID() : this.associateID;
    let paylod = {
      "AssociateStatusInfo": {
        "AssociateId": uid,
        "QuarterId": this._session.getCurrentQuarterDetails().id,
        "IsAsscoaite": this.isPersonal,
        "IsSave": this.isPersonal
      },
      "savePMSKpiList": []
    };
    
    paylod.savePMSKpiList = (this.KPIData['pMSKpiLists'] || []).filter(l => l['isFixed'] === true).map((d: any) => ({
      "kpiId": d.kpiId,
      "evaluationDetailId": d.evaluationDetailId,
      "associateWeightageRating":d.associateWeightageRating,
      "associateMeasurementScale":d.associateMeasurementScale,
      "systemScore": parseFloat(d.systemScore).toFixed(2),
      "associateScore": d.associateScore,
      "managerScore": parseFloat(d.mng_rate).toFixed(2),
      "units": d.units,
      "category":d.category,
      "target":  parseFloat(d.target).toFixed(2),
      "weightage": parseFloat( d.weightage).toFixed(2),
      "isFixed":d.isFixed
    }));

    
    // (this.KPIData['pMSKpiLists'] || []).map((d,i) => (
    //   paylod['savePMSKpiList'].push({
    //     "kpiId": d.kpiId,
    //     "evaluationDetailId": d.evaluationDetailId,
    //     "associateWeightageRating": d.isFixed ? d.associateWeightageRating : '',
    //     "systemScore": parseFloat(d.systemScore || "0").toFixed(2),
    //     "associateMeasurementScale": (this.selfDetails[i] && this.selfDetails[i].kpiNumber === d.kpiNumber) ? this.selfDetails[i]['selfRating'] : (d.associateMeasurementScale ? d.associateMeasurementScale : ''),
    //     "Comment": (this.selfDetails[i] && this.selfDetails[i].kpiNumber === d.kpiNumber) ? this.selfDetails[i]['selfCMT'] : '',
		//     "associateScore": (this.selfDetails[i] && this.selfDetails[i].kpiNumber === d.kpiNumber)? this.selfDetails[i]['selfRating'] : 0,
    //     "units": d.units,
    //     "target":  parseFloat(d.target).toFixed(2),
    //     "weightage": parseFloat( d.weightage).toFixed(2),
    //     "managerMeasurementScale": this.managerRatingVal ? this.managerRatingVal : (d.managerMeasurementScale ? d.managerMeasurementScale : ''),
    //     "managerScore": this.managerDetails[i] && !d.isFixed ? this.managerDetails[i]['managerRating'] : 0,
    //     "ManagerComment" : this.managerDetails[i] && !d.isFixed ? this.managerDetails[i]['managerCMT'] : '',
    //     "isFixed":d.isFixed,
    //     "isPersonal": this.isPersonal,
    //   })
    // ));
   // console.log('paylod.savePMSKpiList>>', paylod.savePMSKpiList);
    const practiceKPI = (this.KPIData['pMSKpiLists'] || []).filter(l => l['isFixed'] === false);
    if (practiceKPI.length !== 0) {
      practiceKPI.map((d,i: any) => (
      paylod.savePMSKpiList.push({
        "kpiId": d.kpiId,
        "evaluationDetailId": d.evaluationDetailId,
        "systemScore": parseFloat(d.systemScore || "0").toFixed(2),
        "associateMeasurementScale": (this.selfDetails[i] && this.selfDetails[i].kpiNumber === d.kpiNumber) ? this.selfDetails[i]['selfRating'] : (d.associateMeasurementScale ? d.associateMeasurementScale : ''),
        "Comment": (this.selfDetails[i] && this.selfDetails[i].kpiNumber === d.kpiNumber) ? this.selfDetails[i]['selfCMT'] : (d.comment ? d.comment : ''),
		    "associateScore": d.associateScore,
        "units": d.units,
        "target":  parseFloat(d.target).toFixed(2),
        "weightage": parseFloat( d.weightage).toFixed(2),
        "managerMeasurementScale": (this.managerDetails[i] && this.managerDetails[i].kpiNumber === d.kpiNumber) ? this.managerDetails[i]['managerRating'] : (d.managerMeasurementScale ? d.managerMeasurementScale : ''),
        "managerScore": d.managerScore,
        "ManagerComment" : (this.managerDetails[i] && this.managerDetails[i].kpiNumber === d.kpiNumber) ? this.managerDetails[i]['managerCMT'] : '',
        "isFixed":d.isFixed,
        "isPersonal": this.isPersonal,
      })
    ))
    }

//console.log(">>>>>",paylod);return;
    this._homeService.SavePMSSelfEvaluation(paylod).subscribe(data => {
      let foo: any = data;
      this.isAPILoad = false;
      if (foo === 1) {
        this._alert.succuss("Rating Posted Successfully!");
      }
    })
  }


  openDialog(kpidata) {
    kpidata['isPersonal'] = this.isPersonal;
    let uid = this.isPersonal ? this._session.getUserID() : this.associateID;
    kpidata['associate_id'] = uid;
    const dialogRef = this.dialog.open(CommentPopup, { disableClose: true, data: kpidata });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openriceDiscussition(kp) {
    const dialogRef = this.dialog.open(Ricediscussitionppup, { disableClose: true, data: kp });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  handleInputChange(event: any, parentKey: string, childKey: string, index) {
    let weightage = this.pMSKpiLists[index]['weightage'] || 0;
    if (weightage < parseFloat(event.target.value)) {
      event.target.value = '';
      this._alert.error("Maximum Rating permitted is " + weightage);
      return false;
    }
    this.pMSKpiLists[index][childKey] = event.target.value;
    if(childKey==='mng_rate'){
      if(this.pMSKpiLists[index]['raiseDiscussionStaus']==='In Progress'){
        this.pMSKpiLists[index]['raiseDiscussionEdited']=true;
      }
    }
    this.pMSKpiLists = this.pMSKpiLists;
    let pEdata = this._dataService.getPerformanceEvaluation();
    pEdata['pMSKpiLists_nonfixed'] = this.pMSKpiLists;
    this._dataService.setPerformanceEvaluation(pEdata);
    this.MngcalculatePer();
    this.SelfcalculatePer();
  }
   _parseFloat(v){
     try{
       const p = parseFloat(v);
       return isNaN(p) ? 0.0 : p;
     }catch(ex){}
     return 0.0;
   }

   MngcalculatePer(){
    try{
      const {pMSKpiLists} = this;
      let per = 0;
      pMSKpiLists.forEach(kpi=>{
        const {mng_rate, weightage, target} = kpi;
        const parse = v => this._parseFloat(v)
        per = per + (parse(mng_rate));
      })
      this.managerRating = per.toFixed(2);

    }catch{
      this.managerRating = 0;
    }
  }
  
  SelfcalculatePer(){
    try{
      const {pMSKpiLists} = this;
      let per = 0;
      pMSKpiLists.forEach(kpi=>{
        const {self_rate} = kpi;
        const parse = v => this._parseFloat(v)
        per = per + ((parse(self_rate)));
      })
      this.selfRating = per.toFixed(2);

    }catch{
      this.selfRating = 0;
    }
  }
}

@Component({
  selector: 'app-comment-popup',
  templateUrl: './comment-popup.html',
  styleUrls: ['./performan-evalution-right.component.css']
})

export class CommentPopup implements OnInit {
  private comments: any;
  public cmt = [];
  private isCommnetView = true;
  private isPersonal = true;
  private associate_id = null;
  private latestComments = {};
  constructor(private dialogRef: MatDialogRef<CommentPopup>, private _alert: AlertMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _session: SessionServiceService,
    private service: HomeService,
    private _snackBar: MatSnackBar) {
    this.comments = data['pMSComments'] || [];
    // this.latestComments = this.comments[0] || {}
    // console.log(this.latestComments)
    this.isPersonal = data['isPersonal'];
    this.associate_id = data['associate_id'];
  }

  ngOnInit() {
    let payloads = {
      "AssociateId": this.associate_id,
      "QuarterId": this._session.getCurrentQuarterDetails().id,
      "KpiId": this.data.kpiId
    }

    this.service.ShowAllComments(payloads).subscribe(res => {
      this.comments = res || [];
      let len = this.comments.length || 0;
      let lCmt = this.comments[len - 1] || {};
      if (lCmt.comment !== '' && lCmt.managerComment !== ''
        && lCmt.comment !== null && lCmt.managerComment !== null
        && lCmt.comment !== undefined && lCmt.managerComment !== undefined) {
        this.latestComments = { "discussionId": null, "comment": "", "managerComment": "" }
      } else {
        this.latestComments = lCmt;
      }
    })
  }

  toogleView() {
    this.isCommnetView = !this.isCommnetView;
  }


  closeCommentpopup() {
    this.dialogRef.close();
  }


  saveRationComments(comments) {
    if ((comments.Reviwer_Comments === "" && this.isPersonal) || (comments.Employee_Comments === "" && !this.isPersonal)) {
      this._snackBar.open("Fill all the fields", null, {
        panelClass: "error-color",
        duration: 2000,
      });
    }
    else {
      let paylod = {
        "AssociateId": this._session.getUserID(),
        "IsAsscoaite": this.isPersonal,
        "QuarterId": this._session.getCurrentQuarterDetails().id,
        "pMSMasterComments": [{
          "KpiId": this.data.kpiId,
          "DiscussionId": this.latestComments['discussionId'] || null,
          "Comment": comments.Reviwer_Comments || "",
          "ManagerComment": comments.Employee_Comments || ""
        }]
      }
     
      this.service.SavePMSComments(paylod).subscribe(data => {
        let d: any = data;
        if (d === 1) {
          this._alert.succuss("Comment Saved Successfully..!")
        }

        this.closeCommentpopup();
      })
    }

  }


}


//riceDiscussition Popup

@Component({
  selector: 'app-raise-discussion-popup',
  templateUrl: './raise-discussion.html',
  styleUrls: ['./performan-evalution-right.component.css']
})

export class Ricediscussitionppup implements OnInit {
  constructor(private dialogRef: MatDialogRef<Ricediscussitionppup>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _session: SessionServiceService,
    private service: HomeService,
    private _snackBar: MatSnackBar,
    private _alert: AlertMessageService) {
  }


  ngOnInit() {

  }


  closeCommentpopup() {
    this.dialogRef.close();
  }
  yesRaise() {
    let payLoad = {
      "AssociateID": this._session.getUserID(),
      "EvaluationDetailId": this.data.evaluationDetailId,
      "KpiId": this.data.kpiId,
      "QuarterId": this._session.getCurrentQuarterDetails().id
    }
    let boo;
    let checkStatus = this.service.SendRaiseDiscussionAlert(payLoad).subscribe(d => {
      this.closeCommentpopup();
      boo = d;
      if (boo === 0) {
        this._alert.error("Something went wrong please send a mail to EP team..!");

      }
      else if (boo === 1) {
        this._alert.succuss("Email sent successfully..! ");
        this.service.UIShouldUpadate({type:"RAISED_DISCUSSION",data:{}});
      }

      else if (boo === 2) {
        this._alert.succuss("Request already raised..!");
      }

    })
  }


}
