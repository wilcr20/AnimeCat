import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pageList= [
    {
      "url": "/home",
      "icon": "home-outline",
      "display": "Animes recientes"
    },
    {
      "url": "/favorites",
      "icon": "star-outline",
      "display": "Favoritos"
    }
  ]
  constructor(
    public menu: MenuController,
    private router: Router
  ) {}

  redirect(url: string){
    console.log("redirect", url);
    
    this.router.navigateByUrl(url)
  }
}
