import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(public httpClient: HttpClient) { }

  getHomeAnime(){
    return this.httpClient.get(environment.apiUrl+ "animeyt/home");
  }

  seeChapterManga(body: any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/SeeChapter", body);
  }
}
