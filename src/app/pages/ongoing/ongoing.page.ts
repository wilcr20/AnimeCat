import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeytService } from 'src/app/shared/services/animeyt.service';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.page.html',
  styleUrls: ['./ongoing.page.scss'],
})
export class OngoingPage implements OnInit {
  isLoading = false;
  title = "Animes en emisión"
  ongoingData: any;

  constructor(
    public animeytService: AnimeytService,
    public router: Router
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ongoingData = null;
    this.geAnimeOngoing();
  }

  geAnimeOngoing() {
    this.isLoading = true;
    this.animeytService.getAnimeOnGoing().subscribe((resp: any) => {
      this.isLoading = false;
      if (resp) {
        this.ongoingData = resp;
        console.log(this.ongoingData);

        this.title = this.ongoingData.title;
      }
    }, (err: any) => {
      this.isLoading = false;
      console.log(err)
    })
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
