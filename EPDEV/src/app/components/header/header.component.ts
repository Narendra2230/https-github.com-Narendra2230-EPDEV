import { Component, OnInit,OnDestroy } from '@angular/core';
import { HomeService } from '../../services/omgb/home.service'
import { SessionServiceService } from '../../services/session/session-service.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private user_name="";
  private user_image="";
  private subscription;
  labelName:string="Enterprise Portal";
  constructor(private _homeService : HomeService, private _session:SessionServiceService) { 
    
  }
  ngOnInit() {
    this.subscription=this._homeService.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'SESSION_DETAILS_UPDATED') {
        this.user_name=this._session.getUserName();
        this.user_image=this._session.getUserPick();
      }
    })
  }

  logout(){
    this._session.logOut();
  //  window.location.href = 'https://ep.suneratech.com/home/logout'
    window.location.href = 'http://epstaging.suneratech.com/'
  }
  gotoProfile(){
 //   window.location.href = 'https://ep.suneratech.com/modules/#/profile-landing'
    window.location.href = 'http://epstaging.suneratech.com/MyAccount/Profile' 
 
  }
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
  changeLabel(){
    if(this.labelName=="Enterprise Portal"){
      this.labelName="MENU"
    }
    else{
      this.labelName="Enterprise Portal"
    }
  }
}
