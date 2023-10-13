import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-my-team-ogpb',
  templateUrl: './my-team-ogpb.component.html',
  styleUrls: ['./my-team-ogpb.component.css']
})
export class MyTeamOgpbComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

}
