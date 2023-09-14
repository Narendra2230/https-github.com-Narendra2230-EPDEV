import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { Routes, RouterModule, Event, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';


import {MyTeamOgpbComponent} from './../screens/my-team-ogpb/my-team-ogpb.component'
import {LandingComponent} from './../screens/landing/landing.component';
import { OgpbEvaluationComponent } from './../screens/ogpb-evaluation/ogpb-evaluation.component';
import { AssignGoalsBandComponent } from './../screens/assign-goals-band/assign-goals-band.component';
import { ExecutiveEvaluationComponent } from './../screens/executive-evaluation/executive-evaluation.component';


import { from } from 'rxjs';




const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'my-profile', component: LandingComponent },
  { path: 'my-team-ogpb', component: MyTeamOgpbComponent },
  { path: 'ogpb-evaluation/:id', component: OgpbEvaluationComponent },
  { path: 'assign-goals-band', component: AssignGoalsBandComponent },
  { path:'executive-evaluation', component:ExecutiveEvaluationComponent} 

  // { path: 'contact', component: LandingComponent,
  //   children: [  
  //     { path: '', component: LandingComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule,]
})
export class OgpbRouts {
//   showLoadingIndiator = true;
//   constructor(  private _route: Router) {
//     this._route.events.subscribe((RouterEvent=>{

//       if(RouterEvent instanceof NavigationStart){
//         this.showLoadingIndiator=true;
//       }

//       if(RouterEvent instanceof NavigationEnd){
//         this.showLoadingIndiator=false;
//       }

//     }))
// }
 }
