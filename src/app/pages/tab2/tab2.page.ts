import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Interfaces/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  news: Article[] = [];
  categories = ['business', 'entertainment', 'general', 'healt', 'science', 'sports', 'technology']

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.loadNews(this.categories[0])
  }

  changeCategory(event) {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  private loadNews(category: string) {
    this.newsService.getTopHeadLinesCategories(category).subscribe(responseNews => {
      this.news.push(...responseNews.articles)
    })
  }
}
