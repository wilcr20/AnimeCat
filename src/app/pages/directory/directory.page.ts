import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

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
    public animeService: AnimeService,
    public router: Router
  ) { 
    this.getDirectoryAnime(this.rootURl);
  }

  ngOnInit() {
  }

  getDirectoryAnime(url:string) {
    this.animeData = null;
    this.isLoading = true;
    this.animeService.getAnimeLatinDirectory({ "url": url }).subscribe((resp) => {
      this.isLoading = false;
      this.animeData = resp;     
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
