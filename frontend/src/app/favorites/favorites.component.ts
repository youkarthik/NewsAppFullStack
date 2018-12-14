import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/newsservice';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteNews: Array<News>;
  constructor(private newsService: NewsService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    return this.newsService.getFavoriteNews().subscribe(response => {
      this.favoriteNews = response;
    }, error => {  this.snackBar.open(error, '', { duration: 5000 }); });
  }

  reload(arg: any) {
    this.ngOnInit();
  }

}
