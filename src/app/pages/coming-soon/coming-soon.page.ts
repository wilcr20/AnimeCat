import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

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
  rootURl = "https://animeyt.es/tv/?status=upcoming&type=&sub=&order=";

  constructor(
    private router: Router,
    public animeService: AnimeService,
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
    this.animeService.getAnimeComingSoon({ "url": this.rootURl }).subscribe((resp) => {
      this.isLoading = false;
      this.animeData = resp;
      this.animeList = this.animeData.data;
      console.log(this.animeData);
      
    }, (err) => {
      this.isLoading = false;
      console.log(err);

    })
  }

  redirectToAnimeInfo(url: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

  move(ev: any, index: number) {
    console.log(ev.code);

    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("anime_" + newIndex);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          element.focus();
        }
        break;
      case "ArrowUp":
        if (index > 0) {
          let newIndex = index - 4 < 0 ? 0 : index - 4;
          let element = document.getElementById("anime_" + newIndex);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            element.focus();
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
