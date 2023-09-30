import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComingSoonPageRoutingModule } from './coming-soon-routing.module';

import { ComingSoonPage } from './coming-soon.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComingSoonPageRoutingModule,
    NgxLoadingModule.forRoot({})

  ],
  declarations: [ComingSoonPage]
})
export class ComingSoonPageModule {}
