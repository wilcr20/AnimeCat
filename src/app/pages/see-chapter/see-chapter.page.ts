import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from '../../shared/services/anime.service';
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
  playerImg = "";
  playerServer = "";
  playerServerName = "Omega"

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
    this.data = null;
    let animeData = localStorage.getItem("seeChapterData");
    if (animeData) {
      this.data = JSON.parse(animeData)  //window.history.state;
    }

  }

  ionViewWillEnter() {
    let animeData = localStorage.getItem("seeChapterData");
    if (animeData) {
      this.data = JSON.parse(animeData)  //window.history.state;
      this.isLoading = true;
      this.animeService.seeChapterAnime({ animeUrl: this.data.url }).subscribe((resp) => {
        this.isLoading = false;
        if (resp) {
          this.animeData = resp;
          this.title = this.animeData.title
          this.playerServer = this.animeData.defaultPlayer;
          this.setPlayerimg();
        }
      }, (err) => {
        this.isLoading = false;
        console.log(err);
      })
    }
  }

  setPlayerimg() {
    let player = document.getElementById("player");
    if (player) {
      player.style.backgroundImage = "url(" + this.data.img + ")";
    }
  }

  openPlayer() {   
    let target = "_blank";
    let codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe");setInterval(() => {for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })();document.addEventListener("click", handler, true); function handler(e) { }'
    let browser = this.theInAppBrowser.create(this.playerServer, target, this.options);
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

  redirectToAnimeInfo(url: string) {
    this.router.navigate(['/anime-info', url]);
  }

  updateServer(server: any){
    this.playerServer = server.url;
    this.playerServerName = server.server;    
  }

}