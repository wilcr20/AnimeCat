import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeytService {

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

  searchAnime(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/search", body);
  }

  getAnimeInfo(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/getAnimeInfo", body);
  }

  getAnimeOnGoing(){
    return this.httpClient.get(environment.apiUrl+ "animeyt/ongoing");
  }

  getAnimeDirectory(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/directory", body);
  }

  getAnimeLatinDirectory(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/directoryLatin", body);
  }

  getAnimeComingSoon(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeyt/animesComingSoon", body);
  }

}
