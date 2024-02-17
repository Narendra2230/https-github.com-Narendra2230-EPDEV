import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { NewRequestComponent } from '../components/new-request/new-request.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'newRequest', component:NewRequestComponent  },
  { path: 'newRequest/:id', component:NewRequestComponent  },
  { path: 'userProfile/:id', component:UserProfileComponent  },
  { path: 'landingPage', component:LandingPageComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ResourceRequestRouts { }
