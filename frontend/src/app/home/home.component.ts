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
  selectedCategory: string;
  defaultCategory: string = "General";
  constructor(private newsService: NewsService) { 
    this.selectedCategory = this.defaultCategory;
  }

  ngOnInit() {
    this.getHeadlineNews();
    this.getCategoryNews();
  }

  getHeadlineNews() {
    return this.newsService.getTopHeadlines().subscribe(response => {
      this.headlineNews = response;
    });
  }

  getCategoryNews()
  {
    return this.newsService.getCategoryTopHeadlines(this.selectedCategory).subscribe(response => {
      this.categoryNews = response;
    });
  }

  categoryChange() {
    this.getCategoryNews();
  }

}
