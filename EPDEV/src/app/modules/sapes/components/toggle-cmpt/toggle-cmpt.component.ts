import { Component, OnInit, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { Router } from '@angular/router';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-toggle-cmpt',
  templateUrl: './toggle-cmpt.component.html',
  styleUrls: ['./toggle-cmpt.component.css']
})
export class ToggleCmptComponent implements OnInit {
  @Input() checked:any;
  private isManager=false;
  
  constructor(private _router: Router, private _session: SessionServiceService) {
    this.isManager=this._session.isUserManager();
   }

  ngOnInit() {
   
  }
  onChageTeam(event: MatSlideToggleChange) {
    if (event.checked) {
      this._router.navigate(['my-sapes']);
    } else {
      this._router.navigate(['my-team-sapes']);
    }
  }
  
}
