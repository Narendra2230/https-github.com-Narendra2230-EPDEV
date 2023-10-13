import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './../../services/omgb/home.service';
import {LoaderService} from './../../services/loader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
  
})
export class PreloaderComponent implements OnInit {
  isLoading: boolean;
 @Input() loderType="ellipsis";
  constructor(private _HomeService:HomeService, private LoaderService:LoaderService) {}

  ngOnInit() {

    this.LoaderService.status.subscribe((val: boolean) => {
    //this.isLoading = val;
      //alert(this.isLoading);
  });
  }

}
