import { Component, OnInit, Input } from '@angular/core';
import { News } from '../models/news';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() newsList: Array<News>;
  constructor() { }

  ngOnInit() {
  }

}
