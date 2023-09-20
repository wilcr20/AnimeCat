import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OngoingPageRoutingModule } from './ongoing-routing.module';

import { OngoingPage } from './ongoing.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngoingPageRoutingModule,
    NgxLoadingModule.forRoot({})

  ],
  declarations: [OngoingPage]
})
export class OngoingPageModule {}
