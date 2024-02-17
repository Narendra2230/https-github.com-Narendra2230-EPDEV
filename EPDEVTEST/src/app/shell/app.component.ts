import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { HomeService } from './../services/omgb/home.service'
import { SessionServiceService } from './../services/session/session-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//for local verification don't comment anything  
//server - 17,18,35 comment the lines of code and verify
  export class AppComponent {
  private GOTOKEN = false;
  constructor(private _router: Router, private _homeServices: HomeService, private _session: SessionServiceService, private _cservic: ConfirmationService) {
  this._homeServices.getToekDetails().subscribe(t => {
   this._session.storeAuthToken(t);
      this._homeServices.getAssociateDetails({}).subscribe(r => {
        this._session.storeSessionDetails(r);
        this._homeServices.UIShouldUpadate({ type: 'SESSION_DETAILS_UPDATED' })
        this.GOTOKEN = true;
        if (r['isProfileCompleted'] == false) {
          this._router.navigate(['profile-landing']);
          this._cservic.confirm({
            key:"confirmDialog_1",
            acceptLabel:'Go to Profile',
            rejectVisible:false,
            message: r['profileIncompleteDetails'],
            accept: () => {
              // this._router.navigate(['profile-landing']);
            }
          });
        }
     });
    });
  }
  title = 'EP Portal';
}
