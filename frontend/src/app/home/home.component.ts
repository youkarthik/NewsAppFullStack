import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/newsservice';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  headlineNews: Array<News>;
  categoryNews: Array<News>;
  selectedCategory: string;
  defaultCategory = 'General';
  constructor(private newsService: NewsService, private snackBar: MatSnackBar) {
    this.selectedCategory = this.defaultCategory;
  }

  ngOnInit() {
    this.getHeadlineNews();
    this.getCategoryNews();
  }

  getHeadlineNews() {
    return this.newsService.getTopHeadlines().subscribe(response => {
      this.headlineNews = response;
    }, error => { this.snackBar.open(error, '', { duration: 5000 }); });
  }

  getCategoryNews() {
    return this.newsService.getCategoryTopHeadlines(this.selectedCategory).subscribe(response => {
      this.categoryNews = response;
    }, error => { this.snackBar.open(error, '', { duration: 5000 }); });
  }

  categoryChange() {
    this.getCategoryNews();
  }

  reload(arg: any) {
    this.ngOnInit();
  }


}
