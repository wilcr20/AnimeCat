import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import genres from '../../shared/data/genres.json';
import { AnimeflvService } from 'src/app/shared/services/animeflv.service';
import { AnimeytService } from 'src/app/shared/services/animeyt.service';

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

  websiteSelected = localStorage.getItem("website");


  constructor(
    public animeytService: AnimeytService,
    public animeflvService: AnimeflvService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.genresList = genres.data;
    this.isSearchDone = false;
    this.websiteSelected = localStorage.getItem("website");
    this.fillyearList();
    this.defaultSearchUrl = "https://www3.animeflv.net/browse?q=";
  }

  fillyearList() {
    var date = new Date();
    for (let index = date.getFullYear(); index >= 1990; index--) {
      this.yearList.push(index);
    }
  }

  setValue() {
    if (this.searchValue.trim() == "") {
      this.isSearchDone = false;
      this.searchResult = [];
      this.buttons = [];
    } else if (this.searchValue.trim() != "" && this.searchValue.length >= 2) {
      this.currentPage = 1;
      this.genreSelected = "";
      this.yearSelected = "";

      let subscriber = null;
      if (this.websiteSelected == "animeflv") {
        subscriber = this.animeflvService.searchAnime({ "term": this.defaultSearchUrl + this.searchValue });
      } else if (this.websiteSelected == "animeyt") {
        subscriber = this.animeytService.searchAnime({ "term": this.searchValue });
      }

      if (subscriber != null) {
        subscriber.subscribe((resp: any) => {
          this.isSearchDone = true;
          this.searchResult = resp.data;
          if (resp.buttons) {
            //////// falta la paginacion para animeYT
            this.buttons = resp.buttons.filter((btn: { display: string; }) => btn.display != "");
          }
        })
      }


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
    this.animeflvService.searchAnime({ "term": url }).subscribe((data: any) => {
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
    this.animeflvService.filterSearch({ "url": url }).subscribe((data: any) => {
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
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
          element?.focus();
        }
        break;
      case "ArrowUp":
        if (index > 0) {
          let newIndex = index - 4;
          if (newIndex < 0) {
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
