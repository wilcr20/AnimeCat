import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeflvService {

  constructor(public httpClient: HttpClient) { }

  getHomeAnime (){
    return this.httpClient.get(environment.apiUrl+ "animeflv/home");
  }

  searchAnime(body:any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/search", body);
  }

  getAnimeInfo (body:any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/getAnimeInfo", body);
  }

  seeChapterAnime (body: any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/SeeChapter", body);
  }

  filterSearch (body: any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/filterSearch", body);
  }

  getMovies(body: any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/movies", body);
  }

  getAnimeOnGoing(body: any){
    return this.httpClient.post(environment.apiUrl+ "animeflv/ongoing", body);
  }

}
