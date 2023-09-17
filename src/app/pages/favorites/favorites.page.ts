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
    let favorites = localStorage.getItem("favoritesAnime");
    if (favorites) {
      this.favoriteList = JSON.parse(favorites).reverse();
    }
    this.isLoading = false;
  }

  redirectToAnimeInfo(url: string) {
    this.router.navigate(['/anime-info', url]);

  }

}
