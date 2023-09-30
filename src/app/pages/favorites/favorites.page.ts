import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  isLoading = false;
  favoriteList: any = [];

  constructor(
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.favoriteList = [];
    setTimeout(() => {
      let favorites = localStorage.getItem("favoritesAnime");
      if (favorites) {
        this.favoriteList = this.fixFavoritesObjects(JSON.parse(favorites));
      }
      this.isLoading = false;
    }, 500);
  }


  redirectToAnimeInfo(url: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

  // temporal fixes
  fixFavoritesObjects(list: any) {
    let fixed = false;
    for (let index = 0; index < list.length; index++) {
      const fav = list[index];
      if (fav.website === "animeyt") {
        fav.url = fav.url.replace("https://animeyt.es/anime/", "https://animeyt.es/tv/");
      }
      if (!fav.chapters) {
        fixed = true;
        fav.chapters = [];
      }
    }
    if (fixed) {
      localStorage.setItem("favoritesAnime", JSON.stringify(list))
    }
    return list.reverse();
  }


  move(ev: any, index: number) {
    console.log(ev.code);

    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("anime_" + newIndex);

        if (element) {
          console.log(element);
          setTimeout(() => {
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
            element?.focus();
          }, 100);

        }
        break;
      case "ArrowUp":
        if (index > 0) {
          let newIndex = index - 4 < 0 ? 0 : index - 4;
          let element = document.getElementById("anime_" + newIndex);
          if (element) {
            element.scrollTop = element.scrollTop - 250;
            console.log(element);
            setTimeout(() => {
              element?.scrollIntoView({ behavior: "smooth", block: "start" });
              element?.focus();
            }, 100);
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
