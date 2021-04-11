import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseTopHeadLines } from '../Interfaces/interfaces';

const apiKey = environment.ApiKey;
const apiUrl = environment.ApiUrl;
const header = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private executeGet<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers: header })
  }

  getTopHeadLines() {
    return this.executeGet<ResponseTopHeadLines>("/top-headlines?country=us");
  }

  getTopHeadLinesCategories(category:string){
    return this.executeGet<ResponseTopHeadLines>(`/top-headlines?country=us&category=${category}`);
  }
}
