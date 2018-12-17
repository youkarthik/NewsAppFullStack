import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MatCardModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../services/newsservice';
import { Observable } from 'rxjs/Observable';
import { News } from '../models/news';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatSnackBarModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [ CardComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NewsService, MatSnackBar
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    newsService = TestBed.get(NewsService);
    spyOn(newsService, 'addFavoriteNews').and.returnValue(Observable.of(new News()));
    spyOn(newsService, 'deleteFavoriteNews').and.returnValue(Observable.of({}));
  });

  it('should create card component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addFavoriteNews service method on onAdd', () => {
    component.onAdd();
    fixture.detectChanges();
    expect(newsService.addFavoriteNews).toHaveBeenCalled();
  });

  it('should call deleteFavoriteNews service method on onRemove', () => {
    component.news = new News();
    component.onRemove();
    fixture.detectChanges();
    
    expect(newsService.deleteFavoriteNews).toHaveBeenCalled();
  });
});
