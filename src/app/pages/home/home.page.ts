import { Component } from '@angular/core';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animeList = [];
  isLoading = false;

  constructor(
    public animeService: AnimeService
  ) {
    this.geAnimeForHome()
  }

  geAnimeForHome(){
    this.isLoading = true;
    this.animeService.getHomeManga().subscribe((resp: any)=>{
      this.isLoading = false;
      if(resp){
        this.animeList = resp;
        console.log(this.animeList);
        
      }
    }, (err)=>{
      this.isLoading = false;
      console.log(err)
    })
  }

}
