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


  // AnimeFlv
  searchAnime(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/search", body);
  }

  getAnimeInfo_AnimeFlv(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/getAnimeInfo", body);
  }

  seeChapterAnime_AnimeFlv(body: any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/SeeChapter", body);
  }

  filterSearch_AnimeFlv(body: any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/filterSearch", body);
  }

  getMovies(body: any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/movies", body);

  }

}
