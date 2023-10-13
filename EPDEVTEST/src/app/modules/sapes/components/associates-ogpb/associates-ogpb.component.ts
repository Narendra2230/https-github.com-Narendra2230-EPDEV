import { Component, OnInit,OnDestroy } from '@angular/core';
import { HomeService } from './../../../../services/omgb/home.service';
import { SessionServiceService } from './../../../../services/session/session-service.service';

@Component({
  selector: 'app-associates-ogpb',
  templateUrl: './associates-ogpb.component.html',
  styleUrls: ['./associates-ogpb.component.css']
})
export class AssociatesOgpbComponent implements OnInit,OnDestroy {
 
  private projectsItems = [];
  private EvaluationDetails:any = [];
  private empSnapShotDtl: Object = {};
  private isLoading = false;
  subscription;
  constructor(private _homeSerice: HomeService, private _session: SessionServiceService) { }

  ngOnInit() {
    this.subscription=this._homeSerice.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'QUARTR_DETAILS_UPDATED') {
        this.doAPICalls({
          "QuarterId": data['data']['id'],
          "AssociateId": this._session.getUserID(),
          "Quarter": data['data']['displayName'], "Year": data['data']['year']
        }, false);
      } else if (data['type'] === 'QUARTR_DETAILS_INTIATED') {
        this.doAPICalls({
          "QuarterId": data['data']['id'],
          "AssociateId": this._session.getUserID(),
          "Quarter": data['data']['displayName'], "Year": data['data']['year']
        }, true);
      }
    })
  }
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
  pmsClick(i,e){    
    
    this._session.storeEvalutionData(e);
    this.EvaluationDetails.forEach(e => {
      e.isCurrentStatus=false;
    });
    this.EvaluationDetails[i].isCurrentStatus=true;
    this.EvaluationDetails=this.EvaluationDetails;
    this._homeSerice.UIShouldUpadate({type:"PMS_LOADED", data:this.EvaluationDetails.find(p=>p.isCurrentStatus===true)})
  }
  doAPICalls(paylod, isfirst) {
    this.isLoading = true;
    let paylod2 = paylod;
    if (isfirst) {
      paylod2['Year'] = null;
      paylod2['Quarter'] = "";
    }
    this._homeSerice.GetReporteeCountByStatus(paylod2).subscribe((data:any) => {
      this.EvaluationDetails = data;
      this.onloadesendvaltionDetails();
      this._homeSerice.UIShouldUpadate({type:"PMS_LOADED", data:data.find(p=>p.isCurrentStatus===true)})
      
      this.isLoading = false;
    });
   
  }
  quarterChanged(data) {
   
  }
  initQuater() {

  }

  onloadesendvaltionDetails(){
    this.EvaluationDetails.forEach(e => {
      if( e.isCurrentStatus===true){
         this._session.storeEvalutionData(e);
      }
     });
  }

  

}
