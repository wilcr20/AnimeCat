import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowserOptions, InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { AnimeflvService } from 'src/app/shared/services/animeflv.service';
import { AnimeytService } from 'src/app/shared/services/animeyt.service';

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
  playerImg: any;
  playerServer = "";
  playerServerName = ""

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

  websiteSelected = localStorage.getItem("website");


  constructor(
    public animeytService: AnimeytService,
    public animeflvService: AnimeflvService,
    public router: Router,
    private theInAppBrowser: InAppBrowser,
    private _location: Location,
    private sanitizer: DomSanitizer,
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
      let susbcriber = null;
      
      if (this.websiteSelected == "animeflv") {
        susbcriber = this.animeflvService.seeChapterAnime({ animeUrl: this.data.url });
        
      } else if (this.websiteSelected == "animeyt") {
        susbcriber = this.animeytService.seeChapterAnime({ animeUrl: this.data.url });
     
      }

      if (susbcriber) {
        susbcriber.subscribe((resp: any) => {
          this.isLoading = false;
          if (resp.error) {
            this.isLoading = false;
            Swal.fire({
              title: "",
              titleText: "Ocurrió un error al obtener la info del capítulo. Intente de nuevo.",
              heightAuto: false,
              icon: "error"
            });
            this._location.back();
          }
          if (resp && !resp.error) {
            console.log(animeData);
            
            this.animeData = resp;
            this.title = this.animeData.title
            this.playerServer = this.animeData.servers[0].url;
            this.playerServerName = this.animeData.servers[0].server;
            this.setPlayerimg();
          }
        }, (err: any) => {
          this.isLoading = false;
          Swal.fire({
            title: "",
            titleText: "Ocurrió un error al obtener la info del capítulo. Intente de nuevo.",
            heightAuto: false,
            icon: "error"
          })
          this._location.back();
          console.log(err);
        })
      }

    }
  }

  setPlayerimg() {
    this.playerImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.data.img + ')');
  }

  openPlayer() {
    let target = "_blank";
    let codeToExec = ""
    if (this.playerServerName.includes("Send")) {
      codeToExec = 'var func = (function f() { var banner = document.getElementsByClassName("vjs-poster");setInterval(() => {for (let index = 0; index < banner.length; index++) {document.getElementById("vjs-logobrand").style.visibility = "hidden";document.getElementById("vjs-logo-top-bar").style.visibility = "hidden";banner[index].style.visibility = "hidden"; }; }, 20); return f; })();document.addEventListener("keydown", handler, true); function handler(e) {if(e.key == "Enter"){ if(document.getElementById("video-js-video_html5_api")){ if(document.getElementById("video-js-video_html5_api").paused){ document.getElementById("video-js-video_html5_api").play();}else{ document.getElementById("video-js-video_html5_api").pause();}; }} if (e.key == "ArrowUp") { if (document.getElementById("video-js-video_html5_api")) { document.getElementById("video-js-video_html5_api").volume = 1; if(document.getElementById("video-js-video_html5_api").playbackRate < 2) {document.getElementById("video-js-video_html5_api").playbackRate = document.getElementById("video-js-video_html5_api").playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementById("video-js-video_html5_api")) { document.getElementById("video-js-video_html5_api").volume = 1; if(document.getElementById("video-js-video_html5_api").playbackRate > 1){document.getElementById("video-js-video_html5_api").playbackRate = document.getElementById("video-js-video_html5_api").playbackRate - 0.25;}  } } }';
    } else if (this.playerServerName == "Omega" || this.playerServerName.includes("Moon")) {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); setInterval(() => { if(document.getElementsByClassName("jw-video")[0]){document.getElementsByClassName("jw-video")[0].volume = 1;};for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })(); document.addEventListener("keydown", handler, true); function handler(e) { if (e.key == "ArrowUp") { if (document.getElementsByClassName("jw-video")[0]) { document.getElementsByClassName("jw-video")[0].volume = 1; if(document.getElementsByClassName("jw-video")[0].playbackRate < 2) {document.getElementsByClassName("jw-video")[0].playbackRate = document.getElementsByClassName("jw-video")[0].playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementsByClassName("jw-video")[0]) { document.getElementsByClassName("jw-video")[0].volume = 1; if(document.getElementsByClassName("jw-video")[0].playbackRate > 1){document.getElementsByClassName("jw-video")[0].playbackRate = document.getElementsByClassName("jw-video")[0].playbackRate - 0.25;}  } } }'
    }
    else if (this.playerServerName.includes("OK")) {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); setInterval(() => { if(document.getElementsByClassName("html5-vpl_vid_display")[0]){document.getElementsByClassName("html5-vpl_vid_display")[0].focus();}; if(document.getElementsByClassName("vid_play")[0] && !document.getElementsByTagName("video")[0]){ document.getElementsByClassName("vid_play")[0].click();}; for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })(); document.addEventListener("keydown", handler, true); function handler(e) {if(e.key == "Enter"){ if(document.getElementsByClassName("html5-vpl_vid_display")[0]){if(document.getElementsByClassName("html5-vpl_vid_display")[0].paused){document.getElementsByClassName("html5-vpl_vid_display")[0].play();}else{document.getElementsByClassName("html5-vpl_vid_display")[0].pause();}  } }; if (e.key == "ArrowUp") { if (document.getElementsByClassName("html5-html5-vpl_vid_display")[0]) { document.getElementsByClassName("html5-html5-vpl_vid_display")[0].volume = 1; if(document.getElementsByClassName("html5-vpl_vid_display")[0].playbackRate < 2) {document.getElementsByClassName("html5-vpl_vid_display")[0].playbackRate = document.getElementsByClassName("html5-vpl_vid_display")[0].playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementsByClassName("html5-vpl_vid_display")[0]) { document.getElementsByClassName("html5-vpl_vid_display")[0].volume = 1; if(document.getElementsByClassName("html5-vpl_vid_display")[0].playbackRate > 1){document.getElementsByClassName("html5-vpl_vid_display")[0].playbackRate = document.getElementsByClassName("html5-vpl_vid_display")[0].playbackRate - 0.25;}  } } }';
    }
    else if (this.playerServerName.includes("Lions")) {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); setInterval(() => { if(document.getElementsByClassName("afs_ads")[0]){document.getElementsByClassName("afs_ads")[0].style.pointerEvents = "none";}; if (document.getElementsByClassName("jw-video")[0]){ if(document.getElementsByClassName("jw-video")[0].paused){document.getElementsByClassName("jw-video")[0].play()} }; if(document.getElementsByClassName("jw-video")[0]){document.getElementsByClassName("jw-video")[0].volume = 1;}; for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })(); document.addEventListener("keydown", handler, true); function handler(e) { if(e.key == "Enter"){ if(document.getElementsByClassName("jw-video")[0]){ if(document.getElementsByClassName("jw-video")[0].paused){ document.getElementsByClassName("jw-video")[0].play();}else{ document.getElementsByClassName("jw-video")[0].pause();}; }}; if (e.key == "ArrowUp") { if (document.getElementsByClassName("jw-video")[0]) { document.getElementsByClassName("jw-video")[0].volume = 1; if(document.getElementsByClassName("jw-video")[0].playbackRate < 2) { document.getElementsByClassName("jw-video")[0].playbackRate = document.getElementsByClassName("jw-video")[0].playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementsByClassName("jw-video")[0]) { document.getElementsByClassName("jw-video")[0].volume = 1; if(document.getElementsByClassName("jw-video")[0].playbackRate > 1){ document.getElementsByClassName("jw-video")[0].playbackRate = document.getElementsByClassName("jw-video")[0].playbackRate - 0.25;}  } } }'
    }
    else if (this.playerServerName.includes("Mp4")) {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); setInterval(() => { if(document.getElementById("player_html5_api")){ document.getElementById("player_html5_api").volume = 1;}; for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })(); document.addEventListener("keydown", handler, true); function handler(e) { if(e.key == "Enter"){ if(document.getElementById("player_html5_api")){ if(document.getElementById("player_html5_api").paused){ document.getElementById("player_html5_api").play();}else{ document.getElementById("player_html5_api").pause();}; }} if (e.key == "ArrowUp") { if (document.getElementById("player_html5_api")) { document.getElementById("player_html5_api").volume = 1; if(document.getElementById("player_html5_api").playbackRate < 2) {document.getElementById("player_html5_api").playbackRate = document.getElementById("player_html5_api").playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementById("player_html5_api")) { document.getElementById("player_html5_api").volume = 1; if(document.getElementById("player_html5_api").playbackRate > 1){document.getElementById("player_html5_api").playbackRate = document.getElementById("player_html5_api").playbackRate - 0.25;}  } } }'
    }
    else if (this.playerServerName.includes("Kraken")) {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); setInterval(() => { if(document.getElementById("my-video")){ document.getElementById("my-video").volume = 1;}; for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })(); document.addEventListener("keydown", handler, true); function handler(e) { if(e.key == "Enter"){ if(document.getElementById("my-video")){ if(document.getElementById("my-video").paused){ document.getElementById("my-video").play();}else{ document.getElementById("my-video").pause();}; }} if (e.key == "ArrowUp") { if (document.getElementById("my-video")) { document.getElementById("my-video").volume = 1; if(document.getElementById("my-video").playbackRate < 2) {document.getElementById("my-video").playbackRate = document.getElementById("my-video").playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementById("my-video")) { document.getElementById("my-video").volume = 1; if(document.getElementById("my-video").playbackRate > 1){document.getElementById("my-video").playbackRate = document.getElementById("my-video").playbackRate - 0.25;}  } } }'
    }
    else if (this.playerServerName.includes("Your") || this.playerServerName.includes("Cloud")) {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); setInterval(() => { if(document.getElementsByClassName("jw-video jw-reset")[0]){document.getElementsByClassName("jw-video jw-reset")[0].volume=1;}; for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })(); document.addEventListener("keydown", handler, true); function handler(e) { if(e.key == "Enter"){ if(document.getElementsByClassName("jw-video jw-reset")[0]){if(document.getElementsByClassName("jw-video jw-reset")[0].paused){document.getElementsByClassName("jw-video jw-reset")[0].play();}else{document.getElementsByClassName("jw-video jw-reset")[0].pause();}  } }; if (e.key == "ArrowUp") { if (document.getElementsByClassName("jw-video jw-reset")[0]) { document.getElementsByClassName("jw-video jw-reset")[0].volume = 1; if(document.getElementsByClassName("jw-video jw-reset")[0].playbackRate < 2) {document.getElementsByClassName("jw-video jw-reset")[0].playbackRate = document.getElementsByClassName("jw-video jw-reset")[0].playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementsByClassName("jw-video jw-reset")[0]) { document.getElementsByClassName("jw-video jw-reset")[0].volume = 1; if(document.getElementsByClassName("jw-video jw-reset")[0].playbackRate > 1){document.getElementsByClassName("jw-video jw-reset")[0].playbackRate = document.getElementsByClassName("jw-video jw-reset")[0].playbackRate - 0.25;}  } } }'
    }
    else if (this.playerServerName.includes("SW")) {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); setInterval(() => { if(document.getElementsByClassName("jw-video")[0]){document.getElementsByClassName("jw-video")[0].volume = 1;};for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })(); document.addEventListener("keydown", handler, true); function handler(e) { if (e.key == "ArrowUp") { if (document.getElementsByClassName("jw-video")[0]) { document.getElementsByClassName("jw-video")[0].volume = 1; if(document.getElementsByClassName("jw-video")[0].playbackRate < 2) {document.getElementsByClassName("jw-video")[0].playbackRate = document.getElementsByClassName("jw-video")[0].playbackRate + 0.25;} } } else if (e.key == "ArrowDown") { if (document.getElementsByClassName("jw-video")[0]) { document.getElementsByClassName("jw-video")[0].volume = 1; if(document.getElementsByClassName("jw-video")[0].playbackRate > 1){document.getElementsByClassName("jw-video")[0].playbackRate = document.getElementsByClassName("jw-video")[0].playbackRate - 0.25;}  } } }'
    }
    else {
      codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe");setInterval(() => {for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })();document.addEventListener("keydown", handler, true); function handler(e) {  }'
    }

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

  redirectToAnimeInfo(url: string, website: string) {
    localStorage.setItem("website", website);
    this.router.navigate(['/anime-info', url]);
  }

  updateServer(server: any) {
    this.playerServer = server.url;
    this.playerServerName = server.server;
    document.getElementById("playerBtn")?.focus();
  }

}
