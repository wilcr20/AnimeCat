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
  canLoadMore = true


  constructor(
    public animeService: AnimeService,
    public router: Router
  ) {
    this.geAnimeForHome();
  }

  ionViewWillEnter() {
    if(this.animeList.length > 0){
      let temp = this.animeList;
      this.animeList = []
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.animeList = temp;

      }, 500);
    }
    //.scrollToTop();

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

  loadMore(){
    this.isLoading = true;
    this.animeService.getMoreHomeAnime().subscribe((resp: any) => {
      this.isLoading = false;
      if (resp) {
        this.canLoadMore = false;
        this.animeList = this.animeList.concat(resp.data);
      }
    }, (err: any) => {
      this.isLoading = false;
      console.log(err)
    })
  }

  seeChapterAnime(url: any, website: any, title: any, img: any) {
    let data = { url: url, website: website, title: title, img: img };
    localStorage.setItem("website", website);
    localStorage.setItem("seeChapterData", JSON.stringify(data))
    this.router.navigateByUrl("see-chapter");
  }

}
