import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  pageList = [
    {
      "url": "/home",
      "icon": "home-outline",
      "display": "Animes recientes"
    },
    {
      "url": '/search',
      "icon": "search-outline",
      "display": "Buscar"
    },
    // {
    //   "url": "/directory",
    //   "icon": "albums-outline",
    //   "display": "Animes en Latino"
    // },
    {
      "url": "/favorites",
      "icon": "star-outline",
      "display": "Favoritos"
    },
    // {
    //   "url": '/ongoing',
    //   "icon": "calendar-outline",
    //   "display": "En emisión"
    // },
    {
      "url": '/movies',
      "icon": "videocam-outline",
      "display": "Peliculas"
    },
    // {
    //   "url": '/coming-soon',
    //   "icon": "rocket-outline",
    //   "display": "Próximamente"
    // },
    // {
    //   "url": '/closeApp',
    //   "icon": "close-circle-outline",
    //   "display": "CERRAR APP"
    // },
  ]


  constructor(
    public menu: MenuController,
    private router: Router,
  ) {
    let websiteSelected = localStorage.getItem("website");
    if (websiteSelected == null) {
      localStorage.setItem("website", "animeflv");
    }

  }

  openMenu() {
    let select = document.getElementById("selectWebsite") as HTMLSelectElement;
    select.value = localStorage.getItem("website")!;
    if(localStorage.getItem("website") == "animeflv"){
      this.pageList = [
        {
          "url": "/home",
          "icon": "home-outline",
          "display": "Animes recientes"
        },
        {
          "url": '/search',
          "icon": "search-outline",
          "display": "Buscar"
        },
        // {
        //   "url": "/directory",
        //   "icon": "albums-outline",
        //   "display": "Animes en Latino"
        // },
        {
          "url": "/favorites",
          "icon": "star-outline",
          "display": "Favoritos"
        },
        // {
        //   "url": '/ongoing',
        //   "icon": "calendar-outline",
        //   "display": "En emisión"
        // },
        {
          "url": '/movies',
          "icon": "videocam-outline",
          "display": "Peliculas"
        },
      ]
    }else if(localStorage.getItem("website") == "animeyt"){
      this.pageList = [
        {
          "url": "/home",
          "icon": "home-outline",
          "display": "Animes recientes"
        },
        // {
        //   "url": '/search',
        //   "icon": "search-outline",
        //   "display": "Buscar"
        // },
        // {
        //   "url": "/directory",
        //   "icon": "albums-outline",
        //   "display": "Animes en Latino"
        // },
        {
          "url": "/favorites",
          "icon": "star-outline",
          "display": "Favoritos"
        },
         {
           "url": '/ongoing',
           "icon": "calendar-outline",
           "display": "En emisión"
         },
      ]
    }
  }

  selectWebsite(){
    let select = document.getElementById("selectWebsite") as HTMLSelectElement;
    localStorage.setItem("website", select.value);
    location.replace("home");
  }

  redirect(url: string) {
    if (url == "/closeApp") {
      let nav = navigator as any;
      nav.app.exitApp();
    } else {
      this.router.navigateByUrl(url)

    }
  }
}
