import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterEntryRoutingModule } from './master-entry-routing.module';
import { AddBinTypeComponent } from './bin-type/add-bin-type/add-bin-type.component';
import { BinTypeComponent } from './bin-type/bin-type.component';


@NgModule({
  declarations: [AddBinTypeComponent, BinTypeComponent],
  imports: [
    CommonModule,
    MasterEntryRoutingModule
  ]
})
export class MasterEntryModule { }
