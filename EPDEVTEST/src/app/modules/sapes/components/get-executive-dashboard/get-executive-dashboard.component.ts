import { Component, OnInit } from '@angular/core';
import { HomeService } from './../../../../services/omgb/home.service';
import { SessionServiceService } from './../../../../services/session/session-service.service';

@Component({
  selector: 'app-get-executive-dashboard',
  templateUrl: './get-executive-dashboard.component.html',
  styleUrls: ['./get-executive-dashboard.component.css']
})
export class GetExecutiveDashboardComponent implements OnInit {

  private projectsItems = [];
  private EvaluationDetails:any = [];
  private empSnapShotDtl: Object = {};
  private isLoading = false;
  private firstId;
  private GetExecutiveDetails;
  subscription;
  constructor(private _homeSerice: HomeService, private _session: SessionServiceService) { }

  ngOnInit() {

    this.subscription=this._homeSerice.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'QUARTR_DETAILS_UPDATED') {
        this.doAPICalls({
          "QuarterId": data['data']['id'],
          // "AssociateId": this._session.getUserID(),
          // "Quarter": data['data']['displayName'], "Year": data['data']['year']
        }, false);
      } else if (data['type'] === 'QUARTR_DETAILS_INTIATED') {
        this.doAPICalls({
          "QuarterId": data['data']['id'],
          // "AssociateId": this._session.getUserID(),
          // "Quarter": data['data']['displayName'], "Year": data['data']['year']
        }, true);
      }
      
    })

    
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  doAPICalls(paylod, isfirst) {
    this.isLoading = true;
    
    let paylod2 = paylod;
    // if (isfirst) {
    //   paylod2['Year'] = null;
    //   paylod2['Quarter'] = "";
    // }
    // console.log("-->", paylod2);return;
    this._homeSerice.GetExecutiveDashboard(paylod2).subscribe((data:any) => {
      this.EvaluationDetails = data;
      this.EvaluationDetails.forEach(e => {
        if(e["evaluationDescription"]==='All Associates'){
          this.firstId = e["statusId"];
        }        
      });
      
      
      //Getting ExecutiveDetails
      //this.executiveDetaild();
      
     // this.onloadesendvaltionDetails();
      this._homeSerice.UIShouldUpadate({type:"EXECUTIVE_DETAILS", data:this.firstId})
      
      this.isLoading = false;
    });

  
   
  }

  // executiveDetaild(){
  //   var p_load = {
  //     "status":this.firstId,
  //     "isExecutive"  :"true",                                
  //     "QuarterId": this._session.getCurrentQuarterDetails()['id']
  //   }
   
  //   console.log("==>",p_load);
  //   this._homeSerice.GetExecutiveDetails(p_load).subscribe(data=>{
  //     this.GetExecutiveDetails = data;
  //     // console.log("==>",data);
  //   });
   
    

  // }


  

  // onloadesendvaltionDetails(){
  //   this.EvaluationDetails.forEach(e => {
  //     alert(e.isCurrentStatus);
  //     if( e.isCurrentStatus===true){
        
  //        this._session.storeEvalutionData(e);
  //     }
  //    });
  // }

}
