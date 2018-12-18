import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewsService } from '../services/newsservice';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { News } from '../models/news';
import { Observable } from 'rxjs/Observable';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [SearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NewsService,
        // { provide: NewsService, useValue: newsService },
        // ActivatedRoute,
        NewsService,
        {
          provide: ActivatedRoute, useValue: {
            params: {
              subscribe: (fn: (value: Params) => void) => fn({
                searchtext: 'test',
              }),
            },
          }
        },
        MatSnackBar,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    newsService = TestBed.get(NewsService);
    spyOn(newsService, 'getNewsForSearchText').and.returnValue(Observable.of(new Array<News>()));
  });

  it('should create search component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNewsForSearchText service method on ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(newsService.getNewsForSearchText).toHaveBeenCalled();
  });
});
