import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/Interfaces/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  news: Article[] = [];
  categories = ['business', 'entertainment', 'general', 'healt', 'science', 'sports', 'technology'];
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadNews(this.categories[0])
  }

  changeCategory(event) {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  loadData(event) {
    this.loadNews(this.segment.value, event)
  }

  private loadNews(category: string, event?) {
    this.segment.value = category;
    this.newsService.getTopHeadLinesCategories(category).subscribe(responseNews => {
      if (responseNews.articles.length === 0) {
        event.target.disable = true;
        event.target.complete();
        return;
      }
      this.news.push(...responseNews.articles);
      if (event) {
        event.target.complete();
      }
    })
  }
}
