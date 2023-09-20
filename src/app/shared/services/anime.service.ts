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

  getMoreHomeAnime(){
    return this.httpClient.get(environment.apiUrl+ "animeyt/homeSeeMore");
  }

  seeChapterAnime(body: any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/SeeChapter", body);
  }

  getAnimeInfo(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/getAnimeInfo", body);
  }

  getRecommendation(){
    return this.httpClient.get(environment.apiUrl+ "animeyt/recomendation");
  }

  getAnimeOnGoing(){
    return this.httpClient.get(environment.apiUrl+ "animeyt/ongoing");
  }

  getAnimeDirectory(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/directory", body);
  }
}
