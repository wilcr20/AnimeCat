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
    {
      "url": "/directory",
      "icon": "albums-outline",
      "display": "Animes en Latino"
    },
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
    {
      "url": '/coming-soon',
      "icon": "rocket-outline",
      "display": "Próximamente"
    },
  ]
  constructor(
    public menu: MenuController,
    private router: Router
  ) { }

  redirect(url: string) {
    this.router.navigateByUrl(url)
  }
}
