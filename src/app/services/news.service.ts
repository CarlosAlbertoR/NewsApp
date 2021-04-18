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

  HeadlinesPage = 0;
  CategoriesPage = 0;
  CurrentCategory: string = '';
  constructor(private http: HttpClient) { }

  private executeGet<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers: header })
  }

  getTopHeadLines() {
    this.HeadlinesPage++;
    return this.executeGet<ResponseTopHeadLines>(`/top-headlines?country=us&page=${this.HeadlinesPage}`);
  }

  getTopHeadLinesCategories(category: string) {
    if (this.CurrentCategory === category) {
      this.CategoriesPage++;
    } else {
      this.CategoriesPage = 1;
      this.CurrentCategory = category;
    }
    return this.executeGet<ResponseTopHeadLines>(`/top-headlines?country=us&category=${category}&page=${this.CategoriesPage}`);
  }
}
