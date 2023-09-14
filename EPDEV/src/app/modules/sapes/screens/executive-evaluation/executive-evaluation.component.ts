import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/omgb/home.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-executive-evaluation',
  templateUrl: './executive-evaluation.component.html',
  styleUrls: ['./executive-evaluation.component.css']
})
export class ExecutiveEvaluationComponent implements OnInit {

  constructor(private homeService: HomeService, private _session: SessionServiceService) { }

  ngOnInit() {

     
  }

  

}