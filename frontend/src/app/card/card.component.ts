import { Component, OnInit, Input } from '@angular/core';
import { News } from '../models/news';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  news: News;
  constructor() { }

  ngOnInit() {
  }

}
