import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from '../shared/services/anime.service';
import { InAppBrowserOptions, InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-see-chapter',
  templateUrl: './see-chapter.page.html',
  styleUrls: ['./see-chapter.page.scss'],
})
export class SeeChapterPage {
  data: any
  title = ""
  animeData: any;
  isLoading = false;

  options: InAppBrowserOptions = {
    location: 'no',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'no',
    clearsessioncache: 'no',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only   
  };

  constructor(
    public animeService: AnimeService,
    public router: Router,
    private theInAppBrowser: InAppBrowser
  ) {
    this.data = window.history.state;
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.animeService.seeChapterManga({ animeUrl: this.data.url }).subscribe((resp) => {
      this.isLoading = false;
      if(resp){
        this.animeData = resp;
        this.title = this.animeData.title
        console.log(this.animeData);
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    })
  }

  openPlayer(url: string){
    let target = "_blank";
    let codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe");setInterval(() => {for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })();document.addEventListener("click", handler, true); function handler(e) { }'
        let browser = this.theInAppBrowser.create(url, target, this.options);
        browser.on("loadstart").subscribe(() => {
          browser.executeScript({
            code: codeToExec
          });
        });

        browser.on('loadstop').subscribe(() => {
          browser.executeScript({
            code: codeToExec
          });
        });
  }

  redirectToAnimeInfo(url: string){
    console.log(url)
  }

}
