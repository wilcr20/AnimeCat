import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';
import genres from '../../shared/data/genres.json';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isLoading = false;
  defaultSearchUrl = "https://www3.animeflv.net/browse?q=";
  defaultFilterSearchUrl = "https://www3.animeflv.net/browse?";
  searchValue = ""
  searchResult: any = [];
  paginationData: any = [];
  buttons: any = [];
  isSearchDone = false;
  genresList: any = [];
  yearList: any = [];
  genreSelected = "";
  yearSelected = "";
  currentPage = 1;

  constructor(
    public animeService: AnimeService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.genresList = genres.data;
    this.isSearchDone = false;
    // this.searchResult = [];
    // this.searchValue = "";
    // this.buttons = [];
    // this.paginationData = [];
    // this.genreSelected = "";
    // this.yearSelected = "";
    this.fillyearList();
    this.defaultSearchUrl = "https://www3.animeflv.net/browse?q=";
  }

  fillyearList() {
    for (let index = 2023; index >= 1990; index--) {
      this.yearList.push(index);
    }
  }

  setValue() {
    if (this.searchValue.trim() == "") {
      this.isSearchDone = false;
      this.searchResult = [];
      this.buttons = [];
    } else if (this.searchValue.trim() != "" && this.searchValue.length > 2) {
      this.currentPage = 1;
      this.genreSelected = "";
      this.yearSelected = "";
      this.animeService.searchAnime({ "term": this.defaultSearchUrl + this.searchValue })?.subscribe((data: any) => {
        this.isSearchDone = true;
        this.searchResult = data.data;
        if (data.buttons) {
          this.buttons = data.buttons.filter((btn: { display: string; }) => btn.display != "");
        }
      })
    }
  }

  redirectToAnimeInfo(animeUrl: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', animeUrl]);
  }

  redirectToPage(url: string) {
    this.isLoading = true;
    this.searchResult = [];
    this.buttons = [];
    this.animeService.searchAnime({ "term": url }).subscribe((data: any) => {
      this.searchResult = [];
      this.currentPage = Number(url.split("page=")[1]);
      this.buttons = [];
      this.isLoading = false;
      this.isSearchDone = true;
      this.searchResult = data.data;
      if (data.buttons) {
        this.buttons = data.buttons.filter((btn: { display: string; }) => btn.display != "" && btn.display);
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    })
  }

  onChangeGenre(ev: any) {
    this.currentPage = 1;
    let url = this.defaultFilterSearchUrl + "genre=" + this.genreSelected;
    if (this.yearSelected != "") {
      url = url + "&year=" + this.yearSelected
    }
    this.filterSearch(url);
  }

  onChangeYear(ev: any) {
    this.currentPage = 1;
    let url = this.defaultFilterSearchUrl + "year=" + this.yearSelected;
    if (this.genreSelected != "") {
      url = url + "&genre=" + this.genreSelected
    }
    this.filterSearch(url);
  }

  filterSearch(url: string) {
    this.isSearchDone = false;
    this.searchValue = "";
    this.isLoading = true;
    this.searchResult = [];
    this.buttons = [];
    this.animeService.filterSearch_AnimeFlv({ "url": url }).subscribe((data: any) => {
      this.searchResult = [];
      this.buttons = [];
      this.isLoading = false;
      this.isSearchDone = true;
      this.searchResult = data.data;
      this.buttons = data.buttons;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    })
  }

  clearFilters() {
    this.genreSelected = "";
    this.yearSelected = "";
    this.defaultSearchUrl = "https://www3.animeflv.net/browse?q=";
    this.searchValue = "";
    this.isSearchDone = false;
    this.searchResult = [];
    this.searchValue = "";
    this.buttons = [];
    this.paginationData = [];
    this.currentPage = 1;
  }

  move(ev: any, index: number) {
    switch (ev.code) {
      case "ArrowDown":
        let newIndex = index + 4;
        let element = document.getElementById("searchAnime_" + newIndex);
        if (element) {
          setTimeout(() => {
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
            element?.focus();
          }, 100);

        }
        break;
      case "ArrowUp":
        if (index > 0) {
          let newIndex = index - 4 < 0 ? 0 : index - 4;
          let element = document.getElementById("searchAnime_" + newIndex);

          if (element) {
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
