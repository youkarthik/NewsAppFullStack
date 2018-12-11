import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/newsservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  headlineNews: Array<News>;
  categoryNews: Array<News>;

  constructor(private newsService: NewsService) { 

  }

  ngOnInit() {
    this.getHeadlineNews();
  }

  getHeadlineNews() {
    return this.newsService.getTopHeadlines().subscribe(response => {
      this.headlineNews = response;
      this.categoryNews = response;
    });
  }

}
