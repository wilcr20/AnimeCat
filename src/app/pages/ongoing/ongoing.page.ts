import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeflvService } from 'src/app/shared/services/animeflv.service';
import { AnimeytService } from 'src/app/shared/services/animeyt.service';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.page.html',
  styleUrls: ['./ongoing.page.scss'],
})
export class OngoingPage {
  isLoading = false;
  title = "Animes en emisión"
  ongoingData: any;
  currentPage = 1;
  buttons: any = [];
  websiteSelected = localStorage.getItem("website");
  defaultUrl = "https://www3.animeflv.net/browse?status%5B%5D=1&order=default";

  constructor(
    public animeytService: AnimeytService,
    public animeflvService: AnimeflvService,
    public router: Router
  ) {
  }


  ionViewWillEnter() {
    this.ongoingData = null;
    this.buttons = [];
    this.currentPage = 1;
    this.defaultUrl = "https://www3.animeflv.net/browse?status%5B%5D=1&order=default";
    this.websiteSelected = localStorage.getItem("website");
    this.geAnimeOngoing();
  }

  geAnimeOngoing() {
    this.isLoading = true;
    let subscriber = null;
    if (this.websiteSelected == "animeflv") {
      subscriber = this.animeflvService.getAnimeOnGoing({ "url": this.defaultUrl });
    } else if (this.websiteSelected == "animeyt") {
      subscriber = this.animeytService.getAnimeOnGoing();
    }

    if (subscriber != null) {
      subscriber.subscribe((resp: any) => {
        this.isLoading = false;
        if (resp) {
          this.ongoingData = resp;
          this.buttons = this.ongoingData.buttons;
          this.title = this.ongoingData.title || "Animes en Emisión";
        }
      }, (err: any) => {
        this.isLoading = false;
        console.log(err)
      })
    }
  }

  redirectToPage(url: string) {
    this.isLoading = true;
    this.buttons = [];
    let subscriber = null;
    if (this.websiteSelected == "animeflv") {
      subscriber = this.animeflvService.getAnimeOnGoing({ "url": url });
    } else if (this.websiteSelected == "animeyt") {
      subscriber = this.animeytService.getAnimeOnGoing();
    }

    if (subscriber != null) {
      subscriber.subscribe((data: any) => {
        this.ongoingData = [];
        setTimeout(() => {
          this.currentPage = Number(url.split("page=")[1]);
          this.ongoingData = data;
          this.isLoading = false;
          if (data.buttons) {
            this.buttons = data.buttons.filter((btn: { display: string; }) => btn.display != "" && btn.display);
          }
        }, 500);

      }, (err) => {
        this.isLoading = false;
        console.log(err);
      })
    }

  }

  redirectToAnimeInfo(url: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

  move(ev: any, index: number) {
    switch (ev.code) {
      case "ArrowDown":
        break;
      case "ArrowUp":
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
