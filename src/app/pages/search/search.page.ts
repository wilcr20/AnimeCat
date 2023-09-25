import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isLoading = false;
  defaultSearchUrl = "https://www3.animeflv.net/browse?q=";
  searchValue = ""
  searchResult: any = [];
  paginationData: any = [];
  buttons: any = [];
  isSearchDone = false;

  constructor(
    public animeService: AnimeService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isSearchDone = false;
    this.searchResult = [];
    this.buttons = [];
    this.paginationData = [];
    this.defaultSearchUrl = "https://www3.animeflv.net/browse?q=";
  }

  setValue() {
    if (this.searchValue.trim() == "") {
      this.isSearchDone = false;
      this.searchResult = [];
      this.buttons = []
    } else if (this.searchValue.trim() != "" && this.searchValue.length > 2) {
      this.animeService.searchAnime( {"term": this.defaultSearchUrl + this.searchValue }  )?.subscribe((data: any) => {
        this.isSearchDone = true;
        this.searchResult = data.data;
        this.buttons = data.buttons;        
      })
    }
  }

  redirectToAnimeInfo(animeUrl: string, website: string){
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', animeUrl]);
  }

  redirectToPage(url: string){

  }

}
