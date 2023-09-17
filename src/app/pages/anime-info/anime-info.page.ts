import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-anime-info',
  templateUrl: './anime-info.page.html',
  styleUrls: ['./anime-info.page.scss'],
})
export class AnimeInfoPage implements OnInit, OnDestroy {
  private sub: any;
  isFavorite = false;
  textFavorite = "Añadir a favoritos";
  data: any;
  isLoading = false;
  ulrAnime: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public animeService: AnimeService) {

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params: { [x: string]: any; }) => {
      this.ulrAnime = params['id']; // (+) converts string 'id' to a number
      let json = {
        animeUrl: this.ulrAnime
      }
      this.isLoading = true;
      this.animeService.getAnimeInfo(json).subscribe((resp) => {
        this.isLoading = false;
        if (resp) {
          this.data = resp;
          this.verifyFavorite()
        }
      }, (err) => {
        this.isLoading = false;
        console.log(err);

      })
    });
  }

  verifyFavorite() {
    let favorites = localStorage.getItem("favoritesAnime");
    if (favorites) {
      let favoriteList = JSON.parse(favorites);
      this.isFavorite = favoriteList.filter((fav: { title: any; }) => fav.title == this.data.title).length > 0;
    } else {
      this.isFavorite = false;
    }
    this.updateFavoritetext()
  }

  favoriteClick() {
    if (this.isFavorite) {
      let favorites = localStorage.getItem("favoritesAnime");
      if (favorites) {
        let list = JSON.parse(favorites);
        list = list.filter((fav: { title: any; }) => fav.title != this.data.title);
        localStorage.setItem("favoritesAnime", JSON.stringify(list));
      } else {
        return;
      }
    } else {
      let favorite = {
        imageUrl: this.data.imageUrl,
        title: this.data.title,
        url: this.ulrAnime,
        website: this.data.website
      }

      let favorites = localStorage.getItem("favoritesAnime");
      if (favorites) {
        let list = JSON.parse(favorites);
        list.push(favorite);
        localStorage.setItem("favoritesAnime", JSON.stringify(list));
      } else {
        let list = [];
        list.push(favorite);
        localStorage.setItem("favoritesAnime", JSON.stringify(list));
      }
    }

    this.isFavorite = !this.isFavorite;
    this.updateFavoritetext();

  }

  updateFavoritetext() {
    if (!this.isFavorite) {
      this.textFavorite = "Añadir a favoritos";
    } else {
      this.textFavorite = "Remover de favoritos";
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getChapterNumber(idx: number) {
    return this.data.chapterList.length - idx;
  }

  seeChapterAnime(url: any, website: any, title: any, img: any) {
    let data = { url: url, website: website, title: title, img: img };
    localStorage.setItem("seeChapterData", JSON.stringify(data))
    this.router.navigateByUrl("see-chapter");
  }

}
