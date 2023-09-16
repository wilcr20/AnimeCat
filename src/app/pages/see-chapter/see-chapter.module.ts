import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeChapterPageRoutingModule } from './see-chapter-routing.module';

import { SeeChapterPage } from './see-chapter.page';
import { NgxLoadingModule } from 'ngx-loading';
import { PipesModule } from '../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeChapterPageRoutingModule,
    NgxLoadingModule.forRoot({}),
    PipesModule
  ],
  declarations: [SeeChapterPage]
})
export class SeeChapterPageModule {}
