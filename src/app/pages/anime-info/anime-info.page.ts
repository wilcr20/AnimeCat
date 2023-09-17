import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from 'src/app/shared/services/anime.service';

@Component({
  selector: 'app-anime-info',
  templateUrl: './anime-info.page.html',
  styleUrls: ['./anime-info.page.scss'],
})
export class AnimeInfoPage implements OnInit, OnDestroy {
  private sub: any
  data: any;
  isLoading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public animeService: AnimeService) {

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params: { [x: string]: any; }) => {
      let url = params['id']; // (+) converts string 'id' to a number
      let json = {
        animeUrl: url
      }
      this.isLoading = true;
      this.animeService.getAnimeInfo(json).subscribe((resp) => {
        this.isLoading = false;
        if (resp) {
          // console.log(resp);
          this.data = resp;
        }
      }, (err) => {
        this.isLoading = false;
        console.log(err);

      })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getChapterNumber(idx: number) {
    return this.data.chapterList.length - idx;
  }

  seeChapterAnime(url: any, website: any, title: any, img: any) {
    let data = { url: url, website: website, title: title, img: img };
    console.log(data);
    
    localStorage.setItem("seeChapterData", JSON.stringify(data))
    this.router.navigateByUrl("see-chapter");
  }

}
