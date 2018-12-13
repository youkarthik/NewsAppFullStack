import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/newsservice';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  news: News;
  @Output() refreshNewsList = new EventEmitter();
  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  onAdd() {
    this.newsService.addFavoriteNews(this.news).subscribe(
      () => {
        this.refreshNewsList.emit(null);
      },
      error => {
        //  this.snackBar.open(error, '', { duration: 5000 }); 
      }
    );
  }

  onRemove() {
    this.newsService.deleteFavoriteNews(this.news.id).subscribe(
      () => {
        this.refreshNewsList.emit(null);
        //  this.snackBar.open('News added to Watchlist', '', { duration: 5000 })
      },
      error => {
        //  this.snackBar.open(error, '', { duration: 5000 }); 
      }
    );
  }

}
