import { Component } from '@angular/core';
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

  redirectToAnimeInfo(url: string) {
    this.router.navigate(['/anime-info', url]);
  }

  fixFavoritesObjects(list: any) {
    let fixed = false;
    for (let index = 0; index < list.length; index++) {
      const fav = list[index];
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

}
