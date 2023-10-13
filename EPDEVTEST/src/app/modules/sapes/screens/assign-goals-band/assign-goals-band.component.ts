
import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SessionServiceService } from './../../../../services/session/session-service.service';
import { HomeService } from 'src/app/services/omgb/home.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-assign-goals-band',
  templateUrl: './assign-goals-band.component.html',
  styleUrls: ['./assign-goals-band.component.css']
})
export class AssignGoalsBandComponent implements OnInit {
  private KPIData: any = {};
  private band="";
  private CTADisable=false;
  constructor(private _router: Router, private _homeService: HomeService, private _session: SessionServiceService,
    private alert: AlertMessageService, private dialog:MatDialog) { }

  ngOnInit() {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    let data = this._session.getSelectedEmpDetails();
    this._homeService.GetAssignedKPIs(data).subscribe(d => { 
      this.KPIData = d;
      this.CTADisable= (this.KPIData['pmsAssigns'] || []).length===0;
      this.band=(data[0] || {}).band;
      let ci = this._session.getCurrentQuarterDetails();
      this.KPIData['pmsAssigns'].forEach(element => {
        element['quarterId'] = ci['id'];
      });
    })
  }
  checkEnablButtn(status){
    this.CTADisable= (this.KPIData['pmsAssigns'] || []).length===0;
  }
  // savGoals() {
  //   this._homeService.SaveAssignKPIs(this.KPIData).subscribe((d: any) => {
  //     if (d === 1) {
  //       this._router.navigate(['my-team-sapes']);
  //      // this.alert.succuss("Goals Assigned successfully!");
  //     }
  //     // alert("asdfad");
  //   })
  // }
  valiate(goals){
    console.log(goals)
    let s=0;
    goals.map(g=>g.weightage).map(g=>this.parseValue(g)).forEach(g=>s=s+g);
    return 100==s;
  }
  parseValue(v){
    try{
       return parseFloat(v);
    }catch(ex){}
    return 0.0;
  }
  rating_popup(){
    if(!this.valiate(this.KPIData['pmsAssigns'])){
      this.alert.error("All KPIs Weightage Percentage should be 100%");
      return;
    }
  
    const dialogRef = this.dialog.open(AssignGoalsPopup, { disableClose: true, data: this.KPIData });
    dialogRef.afterClosed().subscribe(result => {
    });
}
  goBack() {
    this._router.navigate(['my-team-sapes']);
  }

}




@Component({
  selector: 'app-assign-goals-popup',
  templateUrl: './assign-golas-popup.html',
  styleUrls: ['./assign-goals-band.component.css']
})

export class AssignGoalsPopup implements OnInit {
  private isLaoding=false;
  constructor(private _router: Router, private _homeService: HomeService, private _session: SessionServiceService,
    private alert: AlertMessageService, private dialogRef: MatDialogRef<AssignGoalsPopup>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }
 

  popupDismiss(){
    this.dialogRef.close();
  }
  
  savGoals() {
    // console.log("---->",this.data);
    // return;
  
    this.isLaoding=true;
    let ci = this._session.getCurrentQuarterDetails();
    this.data['pmsAssigns'].forEach(g=>
        {
          g.quarterId=ci['id'];
          g.weightage=parseFloat(g.weightage).toFixed(2);
          g.target=parseFloat(g.target).toFixed(2); 
        }
      );
      
    this._homeService.SaveAssignKPIs(this.data).subscribe((d: any) => {
     // alert(d);
      if (d === 1) {
        this.alert.succuss("Goals Assigned successfully!");
        this.dialogRef.close();
        this.isLaoding=false;
        this._router.navigate(['my-team-sapes']);
        
      }
      // alert("asdfad");
    })
  }
}

