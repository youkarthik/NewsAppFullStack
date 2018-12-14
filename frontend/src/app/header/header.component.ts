import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchText: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearch() {
    this.router.navigate(['/search', this.searchText]);
      this.searchText = '';
  }

}
