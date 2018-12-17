import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/newsservice';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../models/news';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string;
  searchResultNews: Array<News>;
  constructor(private service: NewsService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchText = params['searchtext'];

      if (this.searchText !== '') {
        this.service.getNewsForSearchText(this.searchText).subscribe(response => {
          this.searchResultNews = response;
        }, error => { this.snackBar.open(error, '', { duration: 5000 }); });
      }
    });
  }

  reload(arg: any) {
    this.ngOnInit();
  }

}
