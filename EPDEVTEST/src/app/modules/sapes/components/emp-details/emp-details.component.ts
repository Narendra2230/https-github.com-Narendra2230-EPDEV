import { Component, OnInit } from '@angular/core';
import { HomeService } from './../../../../services/omgb/home.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

  private empinfo: Object = {};


  constructor(private _HomeService: HomeService, private _session: SessionServiceService, private _router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(d => {

    });
    this.getAPIDetails();

    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
  goBack() {
    this._router.navigate(['my-team-sapes']);
  }
  getAPIDetails() {
    this.empinfo = this._session.getSelectedEmpDetails();
  }

}
