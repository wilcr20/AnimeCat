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
  favoriteCount = 0;

  constructor(
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.favoriteCount = 0;
    this.favoriteList = [];
    setTimeout(() => {
      let favorites = localStorage.getItem("favoritesAnime");
      if (favorites) {
        this.favoriteList = this.fixFavoritesObjects(JSON.parse(favorites));
        this.favoriteCount = this.favoriteList.length;
      }
      this.isLoading = false;
    }, 500);
  }

  getFavoriteCountText() {
    if (this.favoriteCount == 1) {
      return "Tiene 1 anime en favorito.";
    } else if (this.favoriteCount > 1) {
      return "Tiene " + this.favoriteCount + " animes en favorito."
    } else {
      return "";
    }
  }


  redirectToAnimeInfo(url: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

  // temporal fixes
  fixFavoritesObjects(list: any) {
    let fixedList: any = [];
    for (let index = 0; index < list.length; index++) {
      const fav = list[index];

      let existAnime = fixedList.filter((anime: { url: any; }) => anime.url == fav.url).length > 0;
      if (!existAnime) {
        if (fav.website == "animeyt") {
          fav.url = fav.url.replace("https://animeyt.es/anime/", "https://animeyt.es/tv/");
        }
        fixedList.push(fav);
      }
    }
    localStorage.setItem("favoritesAnime", JSON.stringify(fixedList))
    return fixedList.reverse();
  }


  move(ev: any, index: number) {
    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("favAnime_" + newIndex);

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
          let element = document.getElementById("favAnime_" + newIndex);
          if (element) {
            element.scrollTop = element.scrollTop - 250;
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
