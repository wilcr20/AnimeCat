import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

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
  currentFavorite: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public animeService: AnimeService) {

  }

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params: { [x: string]: any; }) => {
      this.ulrAnime = params['id']; // (+) converts string 'id' to a number

      this.isLoading = true;
      this.data = null;
      let json = {
        animeUrl: this.ulrAnime
      }
      let website = localStorage.getItem("website");
      if (website == "animeflv") {
        this.animeService.getAnimeInfo_AnimeFlv(json).subscribe((resp: any) => {
          this.isLoading = false;
          if (resp.error) {
            this.isLoading = false;
            Swal.fire({
              title: "",
              titleText: "Ocurrió un error al obtener la info del anime. Intente de nuevo.",
              heightAuto: false,
              icon: "error"
            });
            this._location.back();
          }
          if (resp && !resp.error) {
            if (resp.imageUrl != "" && resp.title != "") {
              this.data = resp;
              this.verifyFavorite()
            } else {
              Swal.fire({
                title: "",
                titleText: "Ocurrió un error al obtener la info del anime. Intente de nuevo.",
                heightAuto: false,
                icon: "error"
              });
              this._location.back();
            }
          }
        }, (err) => {
          this.isLoading = false;
          Swal.fire({
            title: "",
            titleText: "Ocurrió un error al obtener la info del anime. Intente de nuevo.",
            heightAuto: false,
            icon: "error"
          });
          this.router.navigateByUrl("/home")
          console.log(err);
        })
      } else {
        this.animeService.getAnimeInfo(json).subscribe((resp: any) => {
          this.isLoading = false;
          if (resp.error) {
            this.isLoading = false;
            Swal.fire({
              title: "",
              titleText: "Ocurrió un error al obtener la info del anime. Intente de nuevo.",
              heightAuto: false,
              icon: "error"
            });
            this._location.back();
            return;
          }
          if (resp && !resp.error) {
            if (resp.imageUrl != "" && resp.title != "") {
              this.data = resp;
              this.verifyFavorite()
            } else {
              Swal.fire({
                title: "",
                titleText: "Ocurrió un error al obtener la info del anime. Intente de nuevo.",
                heightAuto: false,
                icon: "error"
              });
              this._location.back();
            }

          }
        }, (err) => {
          this.isLoading = false;
          Swal.fire({
            title: "",
            titleText: "Ocurrió un error al obtener la info del anime. Intente de nuevo.",
            heightAuto: false,
            icon: "error"
          });
          this.router.navigateByUrl("/home")
        })
      }
    });
  }

  verifyFavorite() {
    let favorites = localStorage.getItem("favoritesAnime");
    if (favorites) {
      this.getFavoriteValue(favorites)
    } else {
      this.isFavorite = false;
    }
    this.updateFavoritetext()
  }

  getFavoriteValue(favorites: any) {
    let favoriteList = JSON.parse(favorites);
    this.currentFavorite = favoriteList.filter((fav: { title: any; }) => fav.title == this.data.title)
    this.isFavorite = this.currentFavorite.length == 0 ? false : true;
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
      let newFavorite = {
        imageUrl: this.data.imageUrl,
        title: this.data.title,
        url: this.ulrAnime,
        website: this.data.website,
        chapters: []
      }

      let favorites = localStorage.getItem("favoritesAnime");
      this.currentFavorite = [newFavorite];
      if (favorites) {
        let list = JSON.parse(favorites);
        list.push(newFavorite);
        localStorage.setItem("favoritesAnime", JSON.stringify(list));
      } else {
        let list = [];
        list.push(newFavorite);
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
    localStorage.setItem("website", website);
    localStorage.setItem("seeChapterData", JSON.stringify(data))
    this.router.navigateByUrl("see-chapter");
  }

  updateChapterSeen(chapterUrl: string) {
    let favorites = localStorage.getItem("favoritesAnime");
    if (favorites) {
      let list = JSON.parse(favorites);
      list = list.filter((fav: any) => fav.url != this.ulrAnime);
      let needToRemove = this.isChapterSeen(chapterUrl);
      if (needToRemove) {
        this.currentFavorite[0].chapters =
          this.currentFavorite[0].chapters.filter((chapter: { url: string; }) => chapter.url != chapterUrl);
        list.push(this.currentFavorite[0]);
        localStorage.setItem("favoritesAnime", JSON.stringify(list));
        return;
      } else {
        this.currentFavorite[0].chapters.push({ url: chapterUrl });
        list.push(this.currentFavorite[0]);
        localStorage.setItem("favoritesAnime", JSON.stringify(list));
      }
    }

  }

  isChapterSeen(chapterUrl: string) {
    if (!this.currentFavorite) {
      this.isLoading = true
      setTimeout(() => {
        let favorites = localStorage.getItem("favoritesAnime");
        if (favorites) {
          let favoriteList = JSON.parse(favorites);
          this.currentFavorite = favoriteList.filter((fav: { title: any; }) => fav.title == this.data.title)
        }
        this.isLoading = false;
      }, 1000);
      return false;
    }
    return this.currentFavorite[0].chapters.filter((chapter: any) =>
      chapter.url == chapterUrl).length > 0;
  }

  getDescription() {
    if (this.data.description) {
      return this.data.description;
    }
    return "Sin descripción disponible."
  }


  move(ev: any, index: number, isChapter: boolean, isFavButton: boolean) {
    let newIndex = 0;
    let element = null;
    switch (ev.code) {
      case "ArrowDown":


        if (!isChapter && !isFavButton) {
          element = document.getElementById("favBtn");
        }

        if (!isChapter && isFavButton) {
          element = document.getElementById("animeChapter_0");
        }

        if (isChapter && !isFavButton) {
          newIndex = index + 1;
          element = document.getElementById("animeChapter_" + newIndex);
        }

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          element.focus();
        }
        break;
      case "ArrowUp":
        if (!isChapter && isFavButton) {
          element = document.getElementById("infoSection");
        }

        if (isChapter && !isFavButton) {
          if (index == 0) {
            element = document.getElementById("favBtn");
          } else {
            newIndex = index - 1;
            element = document.getElementById("animeChapter_" + newIndex);
          }
        }

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          element.focus();
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

  redirectToAnimeInfo(url: string, website: string){
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

}
