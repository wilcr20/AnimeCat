import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeytService } from 'src/app/shared/services/animeyt.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  isLoading = false;
  animeData: any;
  rootURl = "https://animeyt.es/tv/?page=1&status=&type=&sub=dub&order=update";
  defaultPrefix = "?page=1";
  constructor(
    public animeytService: AnimeytService,
    public router: Router
  ) {
    this.getDirectoryAnime(this.rootURl);
  }

  ngOnInit() {
  }

  getDirectoryAnime(url: string) {
    this.animeData = null;
    this.isLoading = true;
    this.animeytService.getAnimeLatinDirectory({ "url": url }).subscribe((resp: any) => {
      this.isLoading = false;
      this.animeData = resp;
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
    console.log(ev.code);
    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("latinAnime_" + newIndex);
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
          let element = document.getElementById("latinAnime_" + newIndex);
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
