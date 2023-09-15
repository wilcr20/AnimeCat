import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(public httpClient: HttpClient) { }

  getHomeManga(){
    return this.httpClient.get(environment.apiUrl+ "animeyt/home");
  }
}
