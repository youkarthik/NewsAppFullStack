import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../models/news';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() newsList: Array<News>;
  @Output() refreshNewsList = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  reload(arg: any) {
    this.refreshNewsList.emit(arg);
  }

}
