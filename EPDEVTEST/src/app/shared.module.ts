import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreloaderComponent } from './components/preloader/preloader.component';
import { TimeframeDirective } from './directives/timeframe.directive';
import { OnlyText } from './directives/only-text.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PreloaderComponent,
    TimeframeDirective,
    OnlyText
  ],
  exports: [
    PreloaderComponent,
    TimeframeDirective,
    OnlyText
  ],
  providers: [],
})
export class SharedModule { }
