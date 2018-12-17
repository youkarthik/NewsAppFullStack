import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewsService } from '../services/newsservice';
import { Observable } from 'rxjs/Observable';
import { News } from '../models/news';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NewsService,
        MatSnackBar
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    newsService = TestBed.get(NewsService);
    spyOn(newsService, 'getTopHeadlines').and.returnValue(Observable.of(new Array<News>()));
    spyOn(newsService, 'getCategoryTopHeadlines').and.returnValue(Observable.of(new Array<News>()));
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTopHeadlines service method on getHeadlineNews method call', () => {
    component.getHeadlineNews();
    fixture.detectChanges();
    expect(newsService.getTopHeadlines).toHaveBeenCalled();
  });

  it('should call getCategoryTopHeadlines service method on getCategoryNews method call', () => {
    component.getCategoryNews();
    fixture.detectChanges();
    expect(newsService.getCategoryTopHeadlines).toHaveBeenCalled();
  });

});
