import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SidenavAccordionDirective } from './directives/sidenav-accordian.directive';
import { MessageAccordionDirective } from './directives/message-container.derective';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InputTrimDirective } from './directives/input-trim.directive';
import { GrdFilterPipe } from './pipes/grd-filter.pipe';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true
};

@NgModule({
  imports: [
    FlexLayoutModule,
    FormsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  exports: [
    FlexLayoutModule,
    PerfectScrollbarModule,
    FormsModule,
    SidenavAccordionDirective,
    ReactiveFormsModule,
    ChartsModule,
    MessageAccordionDirective,
    InputTrimDirective
  ],
  declarations: [SidenavAccordionDirective, MessageAccordionDirective, InputTrimDirective],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
