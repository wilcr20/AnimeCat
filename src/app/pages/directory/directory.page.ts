import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  isLoading = false;
  animeData: any;
  rootURl = "https://animeyt.es/anime/anime/";
  defaultPrefix = "?page=1";
  constructor(
    public animeService: AnimeService,
    public router: Router
  ) { 
    this.defaultPrefix = "?page=1";
    this.getDirectoryAnime(this.defaultPrefix);
  }

  ngOnInit() {
  }

  getDirectoryAnime(prefix: string) {
    this.animeData = null;
    let url = this.rootURl + prefix;
    this.isLoading = true;
    this.animeService.getAnimeDirectory({ "url": url }).subscribe((resp) => {
      this.isLoading = false;
      this.animeData = resp;
      console.log(this.animeData);
      
    }, (err) => {
      this.isLoading = false;
      console.log(err);

    })
  }

  redirectToAnimeInfo(url: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

}
