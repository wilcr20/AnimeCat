import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimeInfoPage } from './anime-info.page';

const routes: Routes = [
  {
    path: '',
    component: AnimeInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeInfoPageRoutingModule {}
