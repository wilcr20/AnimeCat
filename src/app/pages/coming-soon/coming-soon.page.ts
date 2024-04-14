import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeytService } from 'src/app/shared/services/animeyt.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.page.html',
  styleUrls: ['./coming-soon.page.scss'],
})
export class ComingSoonPage implements OnInit {
  animeList: any = [];
  isLoading = false;
  canLoadMore = true;
  animeData: any;
  rootURl = "https://animeyt.es/tv/?status=upcoming&order=latest";

  constructor(
    private router: Router,
    public animeytService: AnimeytService,
  ) {
    this.getDirectoryAnime();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.animeList.length > 0) {
      let temp = this.animeList;
      this.animeList = [];
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.animeList = temp;
      }, 300);
    }
  }

  getDirectoryAnime() {
    this.animeData = null;
    this.isLoading = true;
    this.animeytService.getAnimeComingSoon({ "url": this.rootURl }).subscribe((resp) => {
      this.isLoading = false;
      this.animeData = resp;
      this.animeList = this.animeData.data;
      console.log(this.animeData);

    }, (err: any) => {
      this.isLoading = false;
      console.log(err);

    })
  }

  redirectToAnimeInfo(url: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

  move(ev: any, index: number) {
    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("soonAnime_" + newIndex);
        if (element) {
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
          element?.focus();
        }
        break;
      case "ArrowUp":
        if (index > 0) {
          let newIndex =  index - 4;
          if(newIndex < 0){
            return;
          }
          let element = document.getElementById("soonAnime_" + newIndex);
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
