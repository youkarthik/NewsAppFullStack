import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/newsservice';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteNews: Array<News>;
  constructor(private newsService: NewsService) { }

  ngOnInit() {

    return this.newsService.getFavoriteNews().subscribe(response => {
      this.favoriteNews = response;
    });
  }

  reload(arg: any) {
    this.ngOnInit();
  }

}
