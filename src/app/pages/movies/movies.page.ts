import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  isLoading = false;
  defaultUrl = "https://www3.animeflv.net/browse?type%5B%5D=movie&order=added";
  // defaultSearchUrl = "https://www3.animeflv.net/browse?q=";
  // defaultFilterSearchUrl = "https://www3.animeflv.net/browse?";
  searchResult: any = [];
  paginationData: any = [];
  buttons: any = [];
  currentPage = 1;

  constructor(
    public animeService: AnimeService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.redirectToPage(this.defaultUrl);
    // this.defaultUrl = "https://www3.animeflv.net/browse?q=";
  }

  redirectToPage(url: string) {
    this.isLoading = true;
    this.searchResult = [];
    this.buttons = [];
    this.animeService.getMovies({ "url": url }).subscribe((data: any) => {
      this.searchResult = [];
      this.currentPage = Number(url.split("page=")[1]);
      this.buttons = [];
      this.isLoading = false;
      this.searchResult = data.data;
      if (data.buttons) {
        this.buttons = data.buttons.filter((btn: { display: string; }) => btn.display != "" && btn.display);
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    })
  }

  
  redirectToAnimeInfo(animeUrl: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', animeUrl]);
  }

  move(ev: any, index: number) {
    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("searchAnime_" + newIndex);
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
          let element = document.getElementById("searchAnime_" + newIndex);

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
