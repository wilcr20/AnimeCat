import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeChapterPage } from './see-chapter.page';

const routes: Routes = [
  {
    path: '',
    component: SeeChapterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeChapterPageRoutingModule {}
