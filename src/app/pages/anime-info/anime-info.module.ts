import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimeInfoPageRoutingModule } from './anime-info-routing.module';

import { AnimeInfoPage } from './anime-info.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimeInfoPageRoutingModule,
    NgxLoadingModule.forRoot({}),
  ],
  declarations: [AnimeInfoPage]
})
export class AnimeInfoPageModule {}
