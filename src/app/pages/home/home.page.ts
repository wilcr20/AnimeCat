import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animeList: any = [];
  isLoading = false;

  constructor(
    public animeService: AnimeService,
    public router: Router
  ) {
  }

  ionViewWillEnter() {
    this.geAnimeForHome();
  }

  geAnimeForHome() {
    this.isLoading = true;
    this.animeService.getHomeAnime().subscribe((resp: any) => {
      this.isLoading = false;
      if (resp) {
        this.animeList = resp.data;
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err)
    })
  }

  seeChapterAnime(url: any, website: any, title: any) {
    let data = { url: url, website: website, title: title };
    this.router.navigate(["see-chapter"],{state: data} );
  }

}
