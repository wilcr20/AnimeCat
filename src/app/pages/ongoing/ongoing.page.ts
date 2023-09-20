import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.page.html',
  styleUrls: ['./ongoing.page.scss'],
})
export class OngoingPage implements OnInit {
  isLoading = false;
  title = "Animes en emisión"
  ongoingData: any;

  constructor(
    public animeService: AnimeService,
    public router: Router
  ) { 
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.ongoingData = null;
    this.geAnimeOngoing();
  }

  geAnimeOngoing() {
    this.isLoading = true;
    this.animeService.getAnimeOnGoing().subscribe((resp: any) => {
      this.isLoading = false;
      if (resp) {
        this.ongoingData = resp;
        console.log(this.ongoingData);
        
        this.title = this.ongoingData.title;
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err)
    })
  }

  redirectToAnimeInfo(url: string) {
    this.router.navigate(['/anime-info', url]);
  }


}
