import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Websites } from 'src/app/shared/data/websites.enum';
import { AnimeflvService } from 'src/app/shared/services/animeflv.service';
import { AnimeytService } from 'src/app/shared/services/animeyt.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animeList: any = [];
  isLoading = false;
  canLoadMore = true

  websiteSelected = localStorage.getItem("website");

  constructor(
    public animeytService: AnimeytService,
    public animeflvService: AnimeflvService,
    public router: Router
  ) {
    this.geAnimeForHome();
  }

  ionViewWillEnter() {
    this.websiteSelected = localStorage.getItem("website");
    this.isLoading = false;
    sessionStorage.clear();
    let lastFetch = localStorage.getItem("lastFetchDate");
    if (lastFetch) {
      let now = new Date().getTime();
      let lastFetchDate = JSON.parse(lastFetch) + 1 // 300000 // update home after 5 mins
      if (true) {
        this.geAnimeForHome();
      }
    } else {
      localStorage.setItem("lastFetchDate", JSON.stringify(new Date().getTime()))
    }
  }

  geAnimeForHome() {
    this.isLoading = true;
    let susbcriber = null;

    if (this.websiteSelected == "animeflv") {
      susbcriber = this.animeflvService.getHomeAnime();
    } else if (this.websiteSelected == "animeyt") {
      susbcriber = this.animeytService.getHomeAnime();
    }
    if(susbcriber){
      susbcriber.subscribe((resp: any) => {
        this.isLoading = false;
        localStorage.setItem("lastFetchDate", JSON.stringify(new Date().getTime()));
        if (resp) {
          this.animeList = resp.data;
        }
      }, (err) => {
        this.isLoading = false;
        this.geAnimeForHome();
      })
    }
  
  }

  /*
  loadMore() {
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
  */

  seeChapterAnime(url: any, website: any, title: any, img: any) {
    let data = { url: url, website: website, title: title, img: img };
    localStorage.setItem("website", website);
    localStorage.setItem("seeChapterData", JSON.stringify(data))
    this.router.navigateByUrl("see-chapter");
  }

  move(ev: any, index: number) {
    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("homeAnime_" + newIndex);
        if (element) {
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
          element?.focus();
        }
        break;
      case "ArrowUp":
        if (index > 0) {
          let newIndex = index - 4;
          if (newIndex < 0) {
            return;
          }
          let element = document.getElementById("homeAnime_" + newIndex);
          if (element) {
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
            element?.focus();
          }
        }
        break;
      case "ArrowRight":
        break;
      case "ArrowLeft":
        break;
      default:
        break;
    }

  }

}
